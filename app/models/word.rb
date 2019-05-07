require 'open-uri'

class Word

  def self.create(word)
    new(word).create
  end

  def self.find_or_create(word)
    new(word).find_or_create
  end

  attr_reader :word

  def initialize(word)
    @word = word
  end

  def http
    Net::HTTP.new(uri.host, uri.port).tap do |h|
      h.use_ssl = true
    end
  end

  def query
    Addressable::URI.new.tap do |u|
      u.query_values = {
        apikey: AppEnv.ispeech_api_key,
        text: word,
        action: "convert",
        voice: "usenglishmale"
      }
    end.query
  end

  def url
    "https://api.ispeech.org/api/rest?" + query
  end

  def data
    @data ||= open(url).read
  end

  def slug
    word.strip.downcase.gsub(' ','-').gsub(/[^a-z0-9-]/,'')
  end

  def filename
    slug + '.mp3'
  end

  def create
    directory.files.new({
      key: filename,
      body: data,
      public: true,
    }).save && save_url if data
  end

  def key
    "word:url:#{slug}"
  end

  def find_or_create
    RedisClient.get(key) || create
  end

  def save_url
    "https://one-voice-words.s3.amazonaws.com/#{filename}".tap do |url|
      RedisClient.set(key, url)
    end
  end

  def connection
    @connection ||= Fog::Storage.new({
      provider: 'AWS',
      aws_access_key_id: AppEnv.aws_access_key_id,
      aws_secret_access_key: AppEnv.aws_secret_access_key
    })
  end

  def directory
    @directory ||= connection.directories.get('one-voice-words')
  end

end
