class BatchCharger
  include Sidekiq::Worker

  def perform(uuid, id)
    Batch::Transaction.new(uuid, id).charge
  end

end
