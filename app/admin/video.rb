ActiveAdmin.register Video do
  permit_params :title, :video_category_id, :slug, :description

  menu priority: 7

  form do |f|
    f.inputs do
      f.input :title
      f.input :video_category_id, label: 'Category', as: :select, collection: VideoCategory.all.map { |c| [c.name, c.id] }
      f.input :slug
      f.input :description
    end
    f.actions
  end
end
