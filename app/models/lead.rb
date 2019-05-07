class Lead < ActiveRecord::Base
  phony_normalize :phone, default_country_code: 'US'
  after_create :queue_abandon_email

  def purchased?
    Customer.where("lower(email) = lower(?)", email).any?
  end

  def abandon_email_previously_sent?
    Lead.where("sent_abandon_email_at is not null and lower(email) = lower(?)", email).any?
  end

  def sent_abandon_email?
    !!sent_abandon_email_at
  end

  def content
    @content ||= Content.load(product_type)
  end

  def queue_abandon_email
    SendAbandonEmail.perform_in(2.hours, id)
  end

  class SendAbandonEmail
    include Sidekiq::Worker

    def perform(id)
      lead = Lead.find(id)
      lead.send_abandon_email
    end
  end

  def send_abandon_email
    unless purchased? || abandon_email_previously_sent?
      CustomerMailer.abandon_email(self).deliver
      touch(:sent_abandon_email_at)
    end
  end

end
