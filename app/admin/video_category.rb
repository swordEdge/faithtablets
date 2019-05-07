ActiveAdmin.register VideoCategory do
  permit_params :name, :order, :icon

  menu priority: 6

  config.sort_order = 'position_asc'
  config.paginate = false

  sortable

  index do
    sortable_handle_column
    column(:name) { |c| link_to c.name, admin_video_category_path(c) }
    column(:icon)
    actions
  end

end
