class CreateCustomers < ActiveRecord::Migration[5.0]
  def change
    create_table :customers do |t|
      t.string :email
      t.string :billing_name
      t.string :billing_address_1
      t.string :billing_postal_code
      t.string :billing_city
      t.string :billing_country
      t.string :shipping_name
      t.string :shipping_address_1
      t.string :shipping_postal_code
      t.string :shipping_city
      t.string :shipping_country
      t.datetime :subscribed_at
      t.string :stripe_id
      
    end
  end
end
