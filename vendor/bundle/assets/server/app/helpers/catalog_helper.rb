module CatalogHelper

  def catalog_links_ul(ul_options = {})
    links = [
      ["Catalog", :index]
    ]
    li_tags = []
    links.each do |name,action|
      options = {}
      if params[:controller] == "catalog" && params[:action] == action.to_s
        options[:class] = "active"
      end
      li_tags << content_tag(:li, link_to(name, catalog_path(action)), options)
    end
    content_tag(:ul, raw(li_tags.join(" ")), ul_options)
  end

  def catalog_header(title = nil)
    if title.present?
      content_title(title)
    end
  end

  def primo_search_url(parameters = {})
    parameters = {
      mode: "Basic",
      vid: "NDU",
      tab: "onesearch"
    }.merge(parameters)
    "http://onesearch.library.nd.edu/primo_library/libweb/action/search.do?#{parameters.to_query}"
  end
end
