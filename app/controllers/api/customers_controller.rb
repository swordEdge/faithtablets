class Api::CustomersController < ApplicationController
  skip_before_action :verify_authenticity_token

  def auth
    if @customer = Customer.authorize_email(params[:email])
      EventLogger.perform_async(:auth, { result: 'success', email: params[:email], app: 'puzzle_piece' })
      AuthEvent.create(email: params[:email], success: true)
      render json: { email: @customer.email, auth_token: @customer.auth_token }
    else
      EventLogger.perform_async(:auth, { result: 'failure', email: params[:email] })
      AuthEvent.create(email: params[:email], success: false)
      render text: 'Unauthorized', status: :unauthorized
    end
  end

  def reauth
    if @customer = Customer.authorize_email_and_token(params[:email], params[:auth_token])
      render json: @customer
    else
      render text: 'Unauthorized', status: :unauthorized
    end
  end

  def upgrade
    if @customer = Customer.where(id: params[:customer_id], auth_token: params[:auth_token]).first
      UpgradeCustomer[@customer]
      render json: @customer
    else
      render text: 'Unauthorized', status: :unauthorized
    end
  end

  def create
    if @customer = ChargeCustomer[params]
      CustomerMailer.welcome_email(customer).deliver # welcome emails for when orders are processed
      render json: @customer
    end
  rescue Recurly::API::UnprocessableEntity => e
    json = {errors: ['There was a problem charging your card. Please try again.']}
    render json: json, status: :bad_request
  end

  def search
    if customer = Customer.where("lower(email) = ?", params[:email].downcase).first
      render json: customer.addresses
    else
      render nothing: true
    end
  end

end
