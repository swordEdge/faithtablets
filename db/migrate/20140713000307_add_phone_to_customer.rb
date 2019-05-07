class AddPhoneToCustomer < ActiveRecord::Migration[5.0]
  def change
    add_column :customers, :phone, :string
  end
end
