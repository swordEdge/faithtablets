class EventLogger
  include Sidekiq::Worker

  def perform(event_type, params = {}, timestamp = nil)
    params = params.merge(keen: {timestamp: timestamp.to_time.iso8601}) if timestamp
    Rails.logger.warn("Logged event: event_type: #{event_type}; params: #{params}")
  end

end
