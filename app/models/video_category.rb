class VideoCategory < ActiveRecord::Base
  has_many :videos
  acts_as_list

  def as_json(opts={})
    attributes.slice('id', 'name').merge({
      icon_path: icon_path
    })
  end

  def icon_path
    if icon.present?
      "https://special-needs-tablet-assets.s3.amazonaws.com/icons/#{icon}"
    end
  end

end
