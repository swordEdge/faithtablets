class CreateAuthEvents < ActiveRecord::Migration[5.0]
  def change
    create_table :auth_events do |t|
      t.string :email
      t.boolean :success
      
    end
  end
end
