class RemoveStripeIdFromCustomers < ActiveRecord::Migration[5.0]
  def change
    execute('update customers set recurly_account_code = stripe_id where stripe_id is not null and recurly_account_code is null')
    remove_column :customers, :stripe_id
  end
end
