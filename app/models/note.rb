class Note < ActiveRecord::Base
  belongs_to :admin_user
  belongs_to :customer
end
