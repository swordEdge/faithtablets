class AddCanceledAt < ActiveRecord::Migration[5.0]
  def change
    add_column :customers, :canceled_at, :datetime
  end
end
