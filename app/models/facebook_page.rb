require 'open-uri'

class FacebookPage

  def self.read(name)
    OpenStruct.new(JSON.parse(open("https://graph.facebook.com/#{name}/").read))
  end

end
