class CustomersController < ApplicationController
  skip_before_action :verify_authenticity_token

  def update
    @customer = Customer.find(params[:id])
    @customer.update_attributes(customer_params)
    render json: @customer
  end

  def edit
    @customer = Customer.find(params[:id])
    render :edit, layout: false
  end

  private

  def customer_params
    params.require(:customer).permit(
      :email,
      :first_name,
      :last_name,
      :phone)
  end
end
