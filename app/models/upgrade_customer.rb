class UpgradeCustomer

  attr_reader :customer, :account

  def self.[](params)
    new(params).charge_and_upgrade
  end

  def initialize(customer)
    @customer = customer
    fetch_account
  end

  def fetch_account
    RecurlyConfig.use(customer.product_type) do
      @account = Recurly::Account.find(customer.recurly_account_code)
    end
  end

  def charge
    RecurlyConfig.use(customer.product_type) do
      account.adjustments.create({
        description: "Upgrade",
        unit_amount_in_cents: 99_95
      })
    end
  end

  def charge_and_upgrade
    # charge
    customer.touch(:upgraded_at)
    CustomerMailer.upgrade_email(customer).deliver
  end

end
