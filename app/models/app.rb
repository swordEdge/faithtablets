class App < ActiveRecord::Base
  validates :name, :slug, :released_at, presence: true

  scope :released, -> { where('released_at < now()').order('released_at desc') }

  def url
    [AppEnv.app_url, slug, slug].join('/') + '.apk'
  end

  def icon_url
    [AppEnv.app_url, slug, 'icon.png'].join('/')
  end

  def as_json(opts=nil)
    {
      name: name,
      slug: slug,
      category: category,
      description: description,
      released_at: released_at,
      apk_url: url,
      icon_url: icon_url
    }
  end

end
