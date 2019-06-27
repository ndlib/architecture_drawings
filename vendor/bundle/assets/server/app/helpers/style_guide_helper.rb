module StyleGuideHelper
  def style_guide_breadcrumb(*crumbs)
    crumbs.unshift(link_to("Style Guide", style_guide_path()))
    breadcrumb(*crumbs)
  end

  def style_guide_links_ul(ul_options = {})
    links = [
      ["Style Guide", :index],
      ["One Column", :one_column],
      ["Two Column Left", :two_column_left],
      ["Two Column Right", :two_column_right],
      ["Homepage", :homepage],
      ["Branch", :branch],
      ["Search Appliance", :search_appliance]
    ]
    li_tags = []
    links.each do |name,action|
      options = {}
      if params[:controller] == "style_guide" && params[:action] == action.to_s
        options[:class] = "active"
      end
      li_tags << content_tag(:li, link_to(name, style_guide_path(action)), options)
    end
    content_tag(:ul, raw(li_tags.join(" ")), ul_options)
  end

  def style_guide_header(title = nil)
    if title.present?
      content_title(title)
    end
  end

  def lorem_ipsum
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  end

  def lorem_ipsum_long
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  end

  def search_url(search_path, url_params = {})
    path = "/utilities/search/#{search_path}"
    if url_params.present?
      path += "?#{url_params.to_query}"
    end
    library_url(path)
  end

  def primo_search_url(path, url_params = {})
    if path =~ /^[^\/]+$/
      path = "ndu/#{path}"
    end
    if !Rails.env.production?
      url_params[:vid] = 'NDUC'
    end
    search_url(path, url_params)
  end
end
