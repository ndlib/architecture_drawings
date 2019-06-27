module AdminHelper
  def admin_breadcrumb(*crumbs)
    crumbs.unshift(link_to("Admin", admin_path()))
    breadcrumb(*crumbs)
  end

  def admin_links_ul(ul_options = {})
    links = [
      ["Admin", :index],
      ["One Column", :one_column],
      ["Two Column Left", :two_column_left],
      ["Two Column Right", :two_column_right]
    ]
    li_tags = []
    links.each do |name,action|
      options = {}
      if params[:controller] == "admin" && params[:action] == action.to_s
        options[:class] = "active"
      end
      li_tags << content_tag(:li, link_to(name, admin_path(action)), options)
    end
    content_tag(:ul, raw(li_tags.join(" ")), ul_options)
  end

  def admin_header(title = nil)
    if title.present?
      content_title(title)
    end
  end
end
