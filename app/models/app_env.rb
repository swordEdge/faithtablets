class AppEnv

  def self.method_missing(method, *args, &block)
    if method.match(/(.*)\?$/)
      fetch_bool($1, &block)
    else
      fetch(method, &block)
    end
  end

  def self.include?(key)
    ENV.include?(key.to_s.upcase)
  end

  def self.fetch(key, &block)
    ENV.fetch(key.to_s.upcase, &block)
  rescue KeyError
    raise(KeyError, "#{key} missing from config", caller)
  end

  def self.fetch_bool(key, &block)
    b = self.fetch(key, &block)
    return true if(b =~ (/(true|t|yes|y|1)$/i))
    return false if(b.blank? || b =~ (/(false|f|no|n|0)$/i))
    raise ArgumentError.new("Cannot make boolean from this: #{b}")
  end

end
