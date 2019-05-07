class ApplicationController < ActionController::Base
  force_ssl if: -> { AppEnv.use_ssl? }

  before_action :load_content

  protect_from_forgery with: :exception

  def authenticate_customer_from_token!
    @customer = Customer.find_by_auth_token(params[:auth_token])
    unless @customer && Devise.secure_compare(@customer.email, params[:email])
      flash[:notice] = "Could not authenticate. Please check your link and try again."
      redirect_to root_path
    end
  end

  def load_content
    @content = Content.load(request.domain)
  end

end
