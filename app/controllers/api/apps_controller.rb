class Api::AppsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    if @customer = Customer.authorize_email_and_token(params[:email], params[:auth_token])
      render json: App.released
    else
      render text: 'Unauthorized', status: :unauthorized
    end
  end

end
