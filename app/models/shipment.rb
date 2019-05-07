class Shipment < ActiveRecord::Base
  belongs_to :customer
  validates :customer, presence: true

  before_save :set_shipped_on
  after_save :change_customer_status

  def set_shipped_on
    self.shipped_on = Date.today unless shipped_on.present?
  end

  def change_customer_status
    customer.update_attribute(:status, 'shipped')
  end

  def tracking_url
    return nil unless tracking_number.present?
    "https://tools.usps.com/go/TrackConfirmAction.action?tLabels=#{tracking_number.strip}"
  end

  def queue_email_notification
    SendEmailNotification.perform_async(id)
  end

  def send_email_notification
    CustomerMailer.shipment_email(self).deliver
  end

  class SendEmailNotification
    include Sidekiq::Worker

    def perform(id)
      Shipment.find(id).send_email_notification
    end

  end

end
