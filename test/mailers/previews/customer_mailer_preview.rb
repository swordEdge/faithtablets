# Preview all emails at http://localhost:3000/rails/mailers/customer_mailer
class CustomerMailerPreview < ActionMailer::Preview

  def welcome_email
    customer = Customer.new(billing_name: 'Daniel Rossi')
    CustomerMailer.welcome_email(customer)
  end

  def shipment_email
    customer = Customer.new(shipping_name: 'Daniel Rossi')
    shipment = Shipment.new(customer: customer, tracking_number: '9261290100152137840083')
    customer.save
    shipment.save
    CustomerMailer.shipment_email(customer)
  end

end
