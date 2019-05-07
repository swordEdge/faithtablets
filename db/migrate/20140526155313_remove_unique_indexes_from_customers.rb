class RemoveUniqueIndexesFromCustomers < ActiveRecord::Migration[5.0]
  def change
    remove_index :customers, ["email"]
    remove_index :customers, ["reset_password_token"]
    add_index :customers, ["email"], name: "index_customers_on_email", using: :btree
    add_index :customers, ["reset_password_token"], name: "index_customers_on_reset_password_token", using: :btree
  end
end
