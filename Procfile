web: bundle exec puma -C config/puma.rb
worker: bundle exec sidekiq -c $SIDEKIQ_CONCURRENCY
release: bundle exec rake db:migrate
