class Batch

  def self.create(cents, ids)
    Creator.new(cents, ids).save
  end

  def self.find(uuid)
    new(uuid)
  end

  attr_reader :uuid

  def initialize(uuid)
    @uuid = uuid
  end

  def cents
    @cents ||= RedisClient.get("batch:cents:#{uuid}").to_i
  end

  def ids
    @ids ||= RedisClient.smembers("batch:ids:#{uuid}")
  end

  def transactions
    @transactions ||= ids.map {|i| Transaction.new(uuid, i) }
  end

  class Transaction

    attr_reader :uuid, :id

    def initialize(uuid, id)
      @uuid, @id = uuid, id
    end

    def status
      @status ||= RedisClient.get("batch:status:#{uuid}:#{id}") || 'pending'
    end

    def message
      @message ||= RedisClient.get("batch:message:#{uuid}:#{id}")
    end

    def account
      @account ||= begin
        Recurly::Account.find(id.gsub(/[^a-zA-Z0-9_-]/, ''))
      rescue Recurly::API::NotFound
        nil
      end
    end

    def cents
      @cents ||= Batch.find(uuid).cents
    end

    def charge
      return unless account
      begin
        account.transactions.create(amount_in_cents: cents, currency: 'USD')
        msg = "#{account.first_name} #{account.last_name}"
        RedisClient.multi do
          RedisClient.set("batch:status:#{uuid}:#{id}", 'success')
          RedisClient.expire("batch:status:#{uuid}:#{id}", 24.hours)
          RedisClient.set("batch:message:#{uuid}:#{id}", msg)
          RedisClient.expire("batch:message:#{uuid}:#{id}", 24.hours)
        end
      rescue Recurly::API::ResponseError => e
        msg = "#{e.message} (#{account.first_name} #{account.last_name})"
        RedisClient.multi do
          RedisClient.set("batch:status:#{uuid}:#{id}", "fail")
          RedisClient.expire("batch:status:#{uuid}:#{id}", 24.hours)
          RedisClient.set("batch:message:#{uuid}:#{id}", msg)
          RedisClient.expire("batch:message:#{uuid}:#{id}", 24.hours)
        end
      end
    end

  end

  class Creator

    attr_reader :cents, :ids, :uuid

    def initialize(cents, ids)
      @cents = cents
      @ids = ids.split("\n").map {|i| i.gsub("\r",'') }
      @uuid = SecureRandom.uuid
    end

    def save
      RedisClient.multi do
        RedisClient.set("batch:cents:#{uuid}", cents)
        RedisClient.expire("batch:cents:#{uuid}", 24.hours)
        RedisClient.sadd("batch:ids:#{uuid}", ids)
        RedisClient.expire("batch:ids:#{uuid}", 24.hours)
      end && queue
      return uuid
    end

    def queue
      ids.each do |id|
        BatchCharger.perform_async(uuid, id)
      end
    end

  end
end
