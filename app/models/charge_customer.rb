class ChargeCustomer

  def self.[](params)
    new(params).subscribe_and_create
  end

  attr_reader :params, :customer

  def initialize(params)
    @params = params
  end

  def attr_map
    {
      email: :email,
      phone: :phone,
      first_name: :first_name,
      last_name: :last_name,
      address: :shipping_address_1,
      zip: :shipping_postal_code,
      city: :shipping_city,
      state: :shipping_region
    }
  end

  def apps_only?
    params[:apps_only].to_s == 'true'
  end

  def customer_attrs
    Hash[attr_map.map {|old, new| [new, params[old]] }]
  end

  def address_attrs
    {
      address1: params[:address],
      city: params[:city],
      state: params[:state],
      zip: params[:zip],
      phone: params[:phone]
    }
  end

  def full_name
    "#{params[:first_name]} #{params[:last_name]}"
  end

  def subscribe_and_create
    if subscribe && customer
      CustomerMailer.welcome_email(customer).deliver
      customer.log_event
      customer
    end
  end

  def customer
    @customer ||= Customer.create(customer_attrs) do |c|
      c.subscribed_at = Time.now
      c.product_type = params[:product_type]
      c.billing_name = full_name
      c.shipping_name = full_name
      c.recurly_account_code = account_code
      c.apps_only = false
      c.quantity = 1
    end
  end

  def account_code
    @account_code ||= SecureRandom.uuid
  end

  def coupon_code
    params[:coupon_code] if ['noshipping'].include?(params[:coupon_code])
  end

  def subscribe
    RecurlyConfig.use(params[:product_type]) do
      Recurly::Subscription.create!({
        plan_code: 'free29',
        coupon_code: coupon_code,
        account: {
          account_code: account_code,
          email: params[:email],
          first_name: params[:first_name],
          last_name: params[:last_name],
          billing_info: { token_id: params[:token][:id] },
          address: address_attrs
        }
      })
    end
  end

end
