class AddDispositionsToCustomers < ActiveRecord::Migration[5.0]
  def change
    add_column :customers, :disposition_id, :integer
  end
end
