class AddCallTimeToCustomer < ActiveRecord::Migration[5.0]
  def change
    add_column :customers, :call_time, :string
  end
end
