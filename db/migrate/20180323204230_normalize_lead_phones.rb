class NormalizeLeadPhones < ActiveRecord::Migration[5.0]
  def change
    Lead.all.each(&:save)
  end
end

class Lead < ActiveRecord::Base
  phony_normalize :phone, default_country_code: 'US'
end
