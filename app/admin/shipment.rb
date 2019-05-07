ActiveAdmin.register Shipment do

  menu priority: 3

  permit_params :tracking_number, :customer_id, :shipped_on

  action_item :import, :only => :index do
    link_to 'Import', :action => 'import'
  end

  collection_action :import do
    render 'admin/shipment/import'
  end

  collection_action :upload_file, method: :post do
    ImportShipment[params]
    redirect_to action: :index, :notice => "File imported successfully!"
  end

end
