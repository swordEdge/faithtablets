class AddCategoryToApps < ActiveRecord::Migration[5.0]
  def change
    add_column :apps, :category, :string, default: 'Games'
  end
end
