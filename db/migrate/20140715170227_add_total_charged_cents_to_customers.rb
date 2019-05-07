class AddTotalChargedCentsToCustomers < ActiveRecord::Migration[5.0]
  def change
    add_column :customers, :total_charged_cents, :integer
  end
end
