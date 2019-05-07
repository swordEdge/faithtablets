class AdminUser < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :notes

  def display_name
    if first_name.present? && last_name.present?
      "#{first_name} #{last_name.first}."
    else
      email
    end
  end

end
