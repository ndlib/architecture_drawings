module RarebooksHelper
  def rarebooks_breadcrumb(*crumbs)
    crumbs.unshift(link_to("Rarebooks", rarebooks_path()))
    breadcrumb(*crumbs)
  end

  def rarebooks_links_ul(ul_options = {})
    links = [
      ["Index", :index],
      ["Collections", :collections],
    ]
    li_tags = []
    links.each do |name,action|
      options = {}
      if params[:controller] == "rarebooks" && params[:action] == action.to_s
        options[:class] = "active"
      end
      li_tags << content_tag(:li, link_to(name, rarebooks_path(action)), options)
    end
    content_tag(:ul, raw(li_tags.join(" ")), ul_options)
  end

  def rarebooks_header(title = nil)
    if title.present?
      content_title(title)
    end
  end

  def rarebooks_sidebar(&block)
    content_for(:left_column,
      content_tag(:div,
        content_tag(:ul, capture(&block), class: 'nav nav-list bs-docs-sidenav'),
        class: 'bs-docs-sidebar'
      )
    )
  end
end
