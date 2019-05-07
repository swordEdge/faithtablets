class CreateShipments < ActiveRecord::Migration[5.0]
  def change
    create_table :shipments do |t|
      t.belongs_to :customer
      t.string :tracking_number
      t.date :shipped_on
    end
  end
end
