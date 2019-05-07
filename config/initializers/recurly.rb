class RecurlyConfig
  def self.use(slug, &block)
    prefix = Content.load(slug)[:prefix]

    Recurly.config({
      subdomain: AppEnv.send("#{prefix}_RECURLY_SUBDOMAIN"),
      api_key: AppEnv.send("#{prefix}_RECURLY_API_KEY"),
      default_currency: "USD",
      private_key: AppEnv.send("#{prefix}_RECURLY_JS_PRIVATE_KEY")
    })

    yield

    Recurly.config({
      subdomain: nil,
      api_key: nil,
      default_currency: "USD",
      private_key: nil
    })
  end
end
