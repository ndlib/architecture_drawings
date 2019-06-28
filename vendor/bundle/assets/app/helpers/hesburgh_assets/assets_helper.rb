module HesburghAssets
  module AssetsHelper
    NUMBER_WORDS = {
      1 => "one",
      2 => "two",
      3 => "three",
      4 => "four",
      5 => "five",
      6 => "six",
      7 => "seven",
      8 => "eight",
      9 => "nine",
      10 => "ten",
      11 => "eleven",
      12 => "twelve"
    }
    # Includes the relevant library SSI file from http://www.library.nd.edu/ssi/<filename>.shtml
    def include_ssi(filepath)
      render :partial => "/layouts/hesburgh_assets/include_ssi", :locals => {:filepath => filepath}
    end

    def read_ssi_file(filepath)
      require 'open-uri'
      ssi_url = "http://www.library.nd.edu/#{filepath}"
      f = open(ssi_url, "User-Agent" => "Ruby/#{RUBY_VERSION}")
      contents = f.read
      contents = contents.gsub(/(href|src)="\//,"\\1=\"https://www.library.nd.edu/")
      contents
    end

    def number_to_word(number)
      word = NUMBER_WORDS[number]
      if word.nil?
        raise "Invalid number"
      else
        word
      end
    end

    # Blocks rendered through development_only() will only display when Rails is running in the development environment
    def development_only(&block)
      if Rails.env == 'development'
        content_tag(:div,
          content_tag(:h4, "Development Only") + capture(&block),
          style: "border: dashed 1px #000;padding: 5px;"
        )
      end
    end

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

    def white_box(&block)
      content = capture(&block)
      content_tag(:div, content, :class => "box")
    end

    def yellow_box(&block)
      content = capture(&block)
      content_tag(:div, content, :class => "box yellow")
    end

    def content_title(title)
      content_for(:content_title, content_tag(:h1, title))
    end

    def content_title_links(*links)
      content_for(:content_title_links, raw(links.join(" ")))
    end

    def breadcrumb(*crumbs)
      crumbs.unshift(link_to("Assets", root_path))
      crumbs.unshift(link_to("Hesburgh Libraries", "https://www.library.nd.edu"))
      content_for(:breadcrumb, raw(crumbs.join(" &gt; ")))
    end

    def body_class
      if @body_class.present?
        raw "class=\"#{@body_class.html_safe}\""
      end
    end

    def set_body_class(new_class)
      @body_class = new_class
    end
  end
end
