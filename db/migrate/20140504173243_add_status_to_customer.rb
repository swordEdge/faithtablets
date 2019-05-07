class AddStatusToCustomer < ActiveRecord::Migration[5.0]
  def change
    add_column :customers, :status, :string, default: 'new'
  end
end
