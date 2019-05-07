ActiveAdmin.register_page "Dashboard" do

  menu priority: 1, label: proc{ I18n.t("active_admin.dashboard") }

  content title: proc{ I18n.t("active_admin.dashboard") } do
    columns do
      column do
        panel 'Recent Customers' do
          table_for Customer.order('created_at desc').limit(15).map do |t|
            t.column('Status') { |c| status_tag c.status }
            t.column('Joined') { |c| time_ago_in_words(c.created_at) + ' ago' }
            t.column('Name') { |c| c.billing_name }
            t.column('City, State') { |c| c.city_state }
          end
        end
      end

      column do
        panel "Welcome" do
          para 'Welcome to the Puzzle Piece CRM.'
          para "Send questions and comments to <a href='mailto:colin@colinabartlett.com'>colin@colinabartlett.com</a>".html_safe
        end
      end
    end
  end
end
