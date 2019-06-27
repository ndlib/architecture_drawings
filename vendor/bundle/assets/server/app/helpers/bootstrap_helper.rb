module BootstrapHelper
  def bootstrap_breadcrumb(*crumbs)
    crumbs.unshift(link_to("Bootstrap", bootstrap_path()))
    breadcrumb(*crumbs)
  end

  def bootstrap_links_ul(ul_options = {})
    links = [
      ["Base CSS", :index],
      ["Components", :components],
      ["Javascript", :javascript]
    ]
    li_tags = []
    links.each do |name,action|
      options = {}
      if params[:controller] == "bootstrap" && params[:action] == action.to_s
        options[:class] = "active"
      end
      li_tags << content_tag(:li, link_to(name, bootstrap_path(action)), options)
    end
    content_tag(:ul, raw(li_tags.join(" ")), ul_options)
  end

  def bootstrap_header(title = nil)
    if title.present?
      content_title(title)
    end
  end

  def bootstrap_sidebar(&block)
    content_for(:left_column,
      content_tag(:div,
        content_tag(:ul, capture(&block), class: 'nav nav-list bs-docs-sidenav'),
        class: 'bs-docs-sidebar'
      )
    )
  end
end
