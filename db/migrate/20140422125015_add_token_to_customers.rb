class AddTokenToCustomers < ActiveRecord::Migration[5.0]
  def change
    add_column :customers, :auth_token, :string
  end
end
