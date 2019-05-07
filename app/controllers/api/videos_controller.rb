class Api::VideosController < ApplicationController
  def index
    category = VideoCategory.find(params[:video_category_id])
    render json: category.videos
  end
end
