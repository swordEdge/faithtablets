class Photo

  def self.create(id, data)
    RedisClient.set("photo:#{id}", data)
  end

  def self.find(id)
    RedisClient.get("photo:#{id}")
  end

end
