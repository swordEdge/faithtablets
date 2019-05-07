class AddQuantityToCustomers < ActiveRecord::Migration[5.0]
  def change
    add_column :customers, :quantity, :integer, default: 1
  end
end
