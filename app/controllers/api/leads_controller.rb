class Api::LeadsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    Lead.create(lead_params)
    render nothing: true
  end

  private

  def lead_params
    params.permit(%w(
      first_name last_name email phone
      address city state zip
      boy girl
      age0to6 age7to9 age10to13 age14plus
      coping handling managing following other
      product_type
    ))
  end

end
