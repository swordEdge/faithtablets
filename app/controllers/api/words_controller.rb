class Api::WordsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    if Word.find_or_create(params[:word])
      render nothing: true
    end
  end

end
