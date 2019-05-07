class Api::VideoCategoriesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    render json: VideoCategory.order(:position)
  end

end
