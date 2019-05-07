class Content

  def self.load(slug)
    site = if slug.match(/helpinghands/)
      'helpinghands'
    elsif slug.match(/focusfinder/)
      'focusfinder'
    else
      'puzzlepiece'
    end
    YAML.load_file(Rails.root.join('config','content.yml'))[site].with_indifferent_access
  end

end
