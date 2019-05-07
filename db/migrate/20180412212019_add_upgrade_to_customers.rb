class AddUpgradeToCustomers < ActiveRecord::Migration[5.0]
  def change
    add_column :customers, :upgraded_at, :datetime
  end
end
