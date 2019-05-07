ActiveAdmin.register AuthEvent do
  menu priority: 5
  index do
    column :email
    column('Successful?') {|e| e.success? }
    column('Date/Time') {|e| e.created_at.in_time_zone('America/Los_Angeles') }
  end
end
