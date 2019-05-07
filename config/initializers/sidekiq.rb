Sidekiq.configure_client do |config|
  config.redis = { size: 1, namespace: 'puzzle_piece' }
end

Sidekiq.configure_server do |config|
  config.redis = { size: 5, namespace: 'puzzle_piece' }
end
