class CreateVideos < ActiveRecord::Migration[5.0]
  def change
    create_table :videos do |t|
      t.string :title
      t.string :slug
      t.belongs_to :video_category
      t.text :description
      
    end
  end
end
