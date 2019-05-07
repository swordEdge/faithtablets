ActiveAdmin.register Lead do
  menu priority: 4

  index do
    selectable_column
    column :first_name
    column :last_name
    column :city
    column :state
    column :email
    column('Phone') { |c| c.phone.phony_formatted(normalize: :US) }
    column :purchased?
    column :sent_abandon_email?
    column :product_type
    column :created_at
    actions
  end

  csv do
    column :first_name
    column :last_name
    column :city
    column :state
    column :email
    column :phone
    column :purchased?
    column :sent_abandon_email?
    column :product_type
    column :created_at
  end

end
