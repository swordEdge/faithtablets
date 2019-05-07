# Load the Rails application.
require File.expand_path('../application', __FILE__)

# Initialize the Rails application.
Rails.application.initialize!
ActionMailer::Base.smtp_settings = {
  :user_name => 'tablets',
  :password => 'Puzzle123',
  :domain => 'www.faithtablet.com',
  :address => 'smtp.sendgrid.net',
  :port => 587,
  :authentication => :plain,
  :enable_starttls_auto => true
}
