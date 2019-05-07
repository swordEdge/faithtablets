class AddNotesToCustomers < ActiveRecord::Migration[5.0]
  def change
    create_table :notes do |t|
      t.belongs_to :customer
      t.belongs_to :admin_user
      t.text :text
      
    end
  end
end
