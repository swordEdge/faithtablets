require File.expand_path('../boot', __FILE__)

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

if File.exist?(path = File.expand_path('../defaults.env', __FILE__)) && !ENV['NO_DEFAULTS']
  File.readlines(path).each do |line|
    next unless line.include?('=') && line !~ /^#/
    key, value = *line.chomp.delete("'").split('=', 2)
    ENV[key] ||= value
  end
end

module Puzzlepiece
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
    # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
    config.time_zone = 'Pacific Time (US & Canada)'

    # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
    # config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
    # config.i18n.default_locale = :de

    config.force_ssl = true

    config.assets.precompile += %w(animate.css bootstrap.css magnific-popup.css owl.carousel.css style.css flexslider.css responsive.css *.js)

    config.action_mailer.default_url_options = { host: ENV['BASE_HOST'] }

    config.middleware.use Rack::Cors do
      allow do
        origins '*'
        resource '/api/*', headers: :any, methods: [:get, :post]
      end
    end

    config.middleware.use Rack::Deflater
  end
end
