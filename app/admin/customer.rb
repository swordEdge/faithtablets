ActiveAdmin.register Customer do

  menu priority: 2

  permit_params :billing_name, :billing_address_1, :billing_city, :billing_region, :billing_country, :shipping_name, :shipping_address_1, :shipping_city, :shipping_region, :shipping_country, :email, :status, :disposition_id, :phone, :shipping_postal_code, :billing_postal_code, :recurly_account_code, :quantity, :apps_only, :first_name, :last_name

  actions :all, except: :destroy

  scope 'New', :unshipped
  scope 'Shipped', :shipped
  scope 'Canceled', :canceled

  filter :email
  filter :shipping_name
  filter :subscribed_at
  filter :created_at
  filter :status, as: :select
  filter :product_type, as: :select

  index do
    selectable_column
    column('Status') { |c| status_tag c.status }
    column('Customer #') { |c| link_to(c.number, admin_customer_path(c)) }
    column('Shipping Name') { |c| link_to(c.shipping_name, admin_customer_path(c)) }
    column :shipping_city
    column :shipping_region
    column('Phone') { |c| c.phone.phony_formatted(normalize: :US) }
    column :email
    column('Product') { |c| image_tag("#{c.content[:prefix]}-apple-touch-icon.png", height: '20', alt: c.content[:name]) }
    column('Upgraded?') { |c| c.upgraded? }
    column :created_at
  end

  batch_action :cancel do |ids|
    Customer.find(ids).each &:cancel!
    redirect_to admin_customers_path
  end

  batch_action :mark_shipped do |ids|
    Customer.find(ids).each do |c|
      shipment = c.shipments.create
      CustomerMailer.shipment_email(shipment).deliver_later
    end
    redirect_to admin_customers_path
  end

  member_action :cancel, method: :post do
    customer = Customer.find(params[:id])
    customer.cancel!
    redirect_to [:admin, customer]
  end

  batch_action :send_welcome_email_to do |ids|
    Customer.find(ids).each {|c| CustomerMailer.welcome_email(c).deliver_later }
    redirect_to admin_customers_path
  end

  member_action :send_welcome_email, method: :post do
    customer = Customer.find(params[:id])
    CustomerMailer.welcome_email(customer).deliver_later
    redirect_to [:admin, customer]
  end

  member_action :send_shipment_email, method: :post do
    customer = Customer.find(params[:id])
    if shipment = customer.shipments.order(:shipped_on).last
      CustomerMailer.shipment_email(shipment).deliver_later
    end
    redirect_to [:admin, customer]
  end

  sidebar 'Product', only: [:show, :edit] do
    image_tag("#{customer.content[:prefix]}-apple-touch-icon-152x152.png", height: '60', alt: customer.content[:name])
  end

  sidebar :notes, only: [:show, :edit] do
    customer.notes.each do |note|
      panel note.admin_user.display_name do
        div { note.text }
        em { note.created_at.stamp "March 15, 2012 at 2:14 PM" }
      end
    end
    form_for [:admin, customer, customer.notes.new] do |f|
      f.text_area :text
      f.submit
    end
  end

  show title: :shipping_name do

    columns do
      column span: 2 do
        panel 'Basics' do
          attributes_table_for customer do
            row :email
            row(:phone) { |c| c.phone.phony_formatted }
            row(:status) { |c| status_tag c.status }
            if customer.active?
              row('Cancel') { |c| link_to 'Cancel now', cancel_admin_customer_path(c), method: :post, data: { confirm: "Are you sure?" } }
            else
              row :canceled_at
            end
            row :created_at
            row :subscribed_at
            row('Payment Account') do |c|
              link_to 'Go to Recurly', "https://getpuzzlepiece.recurly.com/accounts/#{c.recurly_account_code}", target: '_blank'
            end
            row('Welcome Email') { |c| link_to 'Resend Welcome Email', send_welcome_email_admin_customer_path(c), method: :post, data: { confirm: "Are you sure?" } }
            if customer.shipments.any?
              row('Shipment Email') { |c| link_to 'Resend Shipment Email', send_shipment_email_admin_customer_path(c), method: :post, data: { confirm: "Are you sure?" } }
            end
          end
        end
      end
    end

    columns do
      column do
        panel 'Shipping' do
          attributes_table_for customer do
            row :shipping_name
            row :shipping_address_1
            row :shipping_city
            row :shipping_region
            row :shipping_postal_code
            row :shipping_country
          end
        end
      end

      column do
        panel 'Billing' do
          attributes_table_for customer do
            row :billing_name
            row :billing_address_1
            row :billing_city
            row :billing_region
            row :billing_postal_code
            row :billing_country
          end
        end
      end
    end

    panel "Shipment History" do
      table_for customer.shipments do
        column :shipped_on
        column(:tracking_number) { |s| link_to(s.tracking_number, s.tracking_url) if s.tracking_number }
      end
    end if customer.shipments.present?

  end

  csv do
    column :created_at
    column :billing_name
    column :billing_address_1
    column :billing_city
    column :billing_region
    column :billing_postal_code
    column :billing_country
    column :shipping_name
    column :shipping_address_1
    column :shipping_city
    column :shipping_region
    column :shipping_postal_code
    column :shipping_country
    column :status
    column :subscribed_at
    column :email
    column :total_charged_cents
    column :recurly_account_code
    column :phone
    column :product_type
  end

end
