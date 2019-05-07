class BatchesController < ApplicationController
  layout false

  def create
    uuid = Batch.create(params[:cents], params[:ids])
    redirect_to batch_path(uuid)
  end

  def show
    @batch = Batch.find(params[:id])
  end

end
