module ApplicationHelper
  def success
    flash[:success]
  end

  def display_notices
    content = raw("")
    if notice
      content += content_tag(:div, notice, class: "alert alert-info")
    end
    if alert
      content += content_tag(:div, alert, class: "alert")
    end
    if success
      content += content_tag(:div, success, class: "alert alert-success")
    end
    content_tag(:div, content, id: "notices")
  end

  def content_title(title)
    content_for(:content_title, content_tag(:h1, title))
  end

  def content_title_links(*links)
    content_for(:content_title_links, raw(links.join(" ")))
  end

  def breadcrumb(*crumbs)
    crumbs.unshift(link_to(application_name, root_path))
    crumbs.unshift(link_to("Hesburgh Libraries", "https://www.library.nd.edu"))
    content_for(:breadcrumb, raw(crumbs.join(" &gt; ")))
  end

  def google_analytics_account
    if Rails.env == "production"
      "UA-2118378-1"
    else
      Rails.env
    end
  end
end
