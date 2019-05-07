class RemoveDeviseFields < ActiveRecord::Migration[5.0]
  def change
    remove_column :customers, :encrypted_password
    remove_column :customers, :reset_password_token
    remove_column :customers, :reset_password_sent_at
    remove_column :customers, :remember_created_at
    remove_column :customers, :sign_in_count
    remove_column :customers, :current_sign_in_at
    remove_column :customers, :last_sign_in_at
    remove_column :customers, :current_sign_in_ip
    remove_column :customers, :last_sign_in_ip
  end
end
