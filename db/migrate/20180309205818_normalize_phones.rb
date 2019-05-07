class NormalizePhones < ActiveRecord::Migration[5.0]
  def change
    Customer.all.each(&:save)
  end
end

class Customer < ActiveRecord::Base
  phony_normalize :phone, default_country_code: 'US'
end
