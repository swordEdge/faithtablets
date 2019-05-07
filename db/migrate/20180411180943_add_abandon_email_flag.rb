class AddAbandonEmailFlag < ActiveRecord::Migration[5.0]
  def change
    add_column :leads, :sent_abandon_email_at, :datetime
  end
end
