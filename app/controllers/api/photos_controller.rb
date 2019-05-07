class Api::PhotosController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    Photo.create(params[:id], params[:data])
    render nothing: true
  end

  def show
    if data = Photo.find(params[:id])
      render text: data
    else
      render nothing: true, status: 404
    end
  end

end
