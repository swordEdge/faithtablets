class AddApps < ActiveRecord::Migration[5.0]
  def change
    create_table :apps do |t|
      t.string :name, limit: 100, null: false
      t.string :slug, limit: 100, null: false
      t.datetime :released_at, null: false
      t.text :description, null: true
      
    end
  end
end
