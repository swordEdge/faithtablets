class PagesController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:thanks, :cancel]

  expose(:likes) { @likes = FacebookPage.read('puzzlepieceapp').likes }

  def legacy_app_center
    @apps = App.all
    render 'apps/index'
  end

  def home
    @customer = Customer.new
  end

  def apps
    redirect_to @content[:apps_url]
  end

  def onevoice
    redirect_to "https://www.amazon.com/gp/product/B07BB6TF2L"
  end

  def videos
    redirect_to "https://www.amazon.com/gp/product/B07BGCJ6JF"
  end

end
