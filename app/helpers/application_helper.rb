module ApplicationHelper

  def icon_tag(name)
    icon_name = name.to_s.titleize.tr(' ','-')
    content_tag('i', class: "icon icons8-#{icon_name}") { }
  end

  def us_states
    %w(AL AK AZ AR CA CO CT DE DC FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA PR RI SC SD TN TX UT VT VA WA WV WI WY)
  end

end
