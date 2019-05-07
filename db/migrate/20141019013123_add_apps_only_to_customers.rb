class AddAppsOnlyToCustomers < ActiveRecord::Migration[5.0]
  def change
    add_column :customers, :apps_only, :boolean, default: false
  end
end
