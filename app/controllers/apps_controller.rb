class AppsController < ApplicationController
  before_action :authenticate_customer_from_token!

  def index
    @apps = App.released
  end
end
