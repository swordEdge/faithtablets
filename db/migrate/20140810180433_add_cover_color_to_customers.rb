class AddCoverColorToCustomers < ActiveRecord::Migration[5.0]
  def change
    add_column :customers, :cover_color, :string
  end
end
