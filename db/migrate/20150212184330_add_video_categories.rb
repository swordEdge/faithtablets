class AddVideoCategories < ActiveRecord::Migration[5.0]
  def change
    create_table :video_categories do |t|
      t.string :name
      t.string :icon
      t.integer :position
      
    end
  end
end
