class Customer < ActiveRecord::Base
  before_create :generate_auth_token

  scope :unshipped, -> { where(status: :new) }
  scope :shipped, -> { where(status: :shipped) }
  scope :canceled, -> { where(status: :canceled) }
  scope :active, -> { where("status != 'canceled'") }

  has_many :notes
  has_many :shipments
  belongs_to :disposition

  phony_normalize :phone, default_country_code: 'US'

  def generate_auth_token
    self.auth_token = Devise.friendly_token
  end

  def months_active
    ((Time.now - subscribed_at).to_i / 60 / 60 / 24 / 30) + 1
  end

  def accessible_app_count
    months_active * 10
  end

  def apps
    App.released.order(:released_at).first(accessible_app_count)
  end

  def to_s
    "#{billing_name} <#{email}>"
  end

  def number
    id.to_s.rjust(6, '0')
  end

  def app_url
    "#{content[:base_url]}/apps?email=#{URI.escape email}&auth_token=#{auth_token}"
  end

  def city_state
    "#{billing_city || shipping_city}, #{billing_region || shipping_region}"
  end

  def cancel!
    touch(:canceled_at)
    update_attributes({
      status: :canceled,
    })
  end

  def active?
    status != 'canceled'
  end

  def send_apps_email
    SendAppsEmail.perform_async(id)
  end

  class SendAppsEmail
    include Sidekiq::Worker

    def perform(id)
      customer = Customer.find(id)
      CustomerMailer.apps_email(customer).deliver
    end
  end

  def metric_attributes
    attributes.slice(*%w(id recurly_account_code subscribed_at billing_email billing_name))
  end

  def snapshot_attributes
    attributes.slice(*%w(id recurly_account_code status)).
    merge({ snapshot_date: Date.today })
  end

  def log_event
    EventLogger.perform_async(:customer_created, metric_attributes, subscribed_at)
  end

  def self.authorize_email(email)
    active.where('lower(email) = ?', email.to_s.downcase).order('created_at desc').first
  end

  def self.authorize_email_and_token(email, token)
    if customer = authorize_email(email)
      return customer if Devise.secure_compare(customer.auth_token, token)
    end
    return false
  end

  def as_json(options)
    super(only:
      [
        :id,
        :name,
        :first_name,
        :last_name,
        :email,
        :auth_token
      ]
    )
  end

  def addresses
    {
      billing: {
        name: {
          full: billing_name.presence || shipping_name
        },
        address: {
          line1: billing_address_1.presence || shipping_address_1,
          city: billing_city.presence || shipping_city,
          state: billing_region.presence || shipping_region,
          zipcode: billing_postal_code.presence || shipping_postal_code,
          country: 'US'
        },
        email: email,
        phone_number: phone
      },
      shipping: {
        name: {
          full: shipping_name
        },
        address: {
          line1: shipping_address_1,
          city: shipping_city,
          state: shipping_region,
          zipcode: shipping_postal_code,
          country: 'US'
        },
        email: email,
        phone_number: phone
      }
    }
  end

  def content
    @content ||= Content.load(product_type)
  end

  def upgraded?
    !!upgraded_at
  end

end
