class RemoveFacebookIdFromCustomers < ActiveRecord::Migration[5.0]
  def change
    remove_column :customers, :facebook_id
  end
end
