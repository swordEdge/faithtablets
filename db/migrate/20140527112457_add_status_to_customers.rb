class AddStatusToCustomers < ActiveRecord::Migration[5.0]
  def change
    add_column :customers, :subscription_recurs_at, :datetime
    add_column :customers, :subscription_status, :string
  end
end
