class AddStateToCustomers < ActiveRecord::Migration[5.0]
  def change
    add_column :customers, :billing_region, :string
    add_column :customers, :shipping_region, :string
  end
end
