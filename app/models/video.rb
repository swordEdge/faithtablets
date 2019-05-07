class Video < ActiveRecord::Base
  belongs_to :video_category

  def as_json(opts={})
    attributes.slice(*%w(id title description)).merge({
      image_path: "https://special-needs-tablet-videos.s3.amazonaws.com/#{slug}/thumb.jpg",
      video_path: "https://special-needs-tablet-videos.s3.amazonaws.com/#{slug}/video.mp4"
    })
  end

end
