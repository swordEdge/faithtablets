class AddCreatedAtToShipments < ActiveRecord::Migration[5.0]
  def change
    add_column :shipments, :created_at, :datetime
    add_column :shipments, :updated_at, :datetime
    execute "update shipments set created_at = now();"
    execute "update shipments set updated_at = now();"
  end
end
