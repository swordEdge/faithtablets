class AddFieldsToCustomers < ActiveRecord::Migration[5.0]
  def change
    add_column :customers, :first_name, :string
    add_column :customers, :last_name, :string
    add_column :customers, :facebook_id, :string

    add_index :customers, :facebook_id, unique: true
  end
end
