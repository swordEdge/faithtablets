class AddProductType < ActiveRecord::Migration[5.0]
  def change
    add_column :leads, :product_type, :string, default: 'puzzlepiece'
    add_column :customers, :product_type, :string, default: 'puzzlepiece'
  end
end
