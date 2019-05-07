class AddLeads < ActiveRecord::Migration[5.0]
  def change
    create_table :leads do |t|
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :phone
      t.string :address
      t.string :city
      t.string :state
      t.string :zip
      t.boolean :boy
      t.boolean :girl
      t.boolean :age0to6
      t.boolean :age7to9
      t.boolean :age10to13
      t.boolean :age14plus
      t.boolean :coping
      t.boolean :handling
      t.boolean :managing
      t.boolean :following
      t.boolean :other
      
    end
  end
end
