class SnapshotCustomers
  include Sidekiq::Worker

  def perform
    Customer.all.each do |customer|
      EventLogger.perform_async(:customer_snapshot, customer.snapshot_attributes)
    end
  end
end
