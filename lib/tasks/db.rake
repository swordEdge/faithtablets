namespace :db do
  task 'schema:clear' => :environment do
    c = ActiveRecord::Base.connection
    c.tables.each do |table|
      c.drop_table table
    end
  end

  task :pg_restore => 'schema:clear' do
    config = ActiveRecord::Base.configurations[Rails.env]
    exec('pg_restore', '--no-owner', '--dbname', config['database'])
  end
end
