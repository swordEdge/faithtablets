class CustomerMailer < ActionMailer::Base
  layout 'email'

  def welcome_email(customer)
    @customer = customer
    setup_content
    setup_logo
    mail(to: @customer.email, from: from_details, subject: "Welcome to #{@content[:name]}!")
  end

  def shipment_email(shipment)
    @shipment = shipment
    @customer = shipment.customer
    setup_content
    setup_logo
    mail(to: @shipment.customer.email, from: from_details, subject: "#{@content[:name]} Shipment")
  end

  def apps_email(customer)
    @customer = customer
    setup_content
    setup_logo
    mail(to: @customer.email, from: from_details, subject: 'Your apps are ready!')
  end

  def abandon_email(lead)
    @lead = lead
    @content = @lead.content
    setup_logo
    mail(to: @lead.email, from: from_details, subject: "Come back for free shipping!")
  end

  def upgrade_email(customer)
    @customer = customer
    setup_content
    setup_logo
    mail(to: @customer.email, from: from_details, subject: 'Thank you for upgrading!')
  end

  private

  def setup_content
    @content = @customer.content
  end

  def from_details
    "\"#{@content[:name]}\" <#{@content[:email]}>"
  end

  def setup_logo
    attachments.inline['logo.png'] = File.read("#{Rails.root}/app/assets/images/#{@content[:prefix]}-logo.png")
  end

end
