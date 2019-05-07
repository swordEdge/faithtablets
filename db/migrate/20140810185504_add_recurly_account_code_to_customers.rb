class AddRecurlyAccountCodeToCustomers < ActiveRecord::Migration[5.0]
  def change
    add_column :customers, :recurly_account_code, :string
  end
end
