module BlacklightHelper
  include Blacklight::BlacklightHelperBehavior

  def render_document_subheadings(document)
    subheadings = content_tag(:h2,render_document_show_field_value(document, field: "author_display"))
    subheadings += content_tag(:h3,render_document_show_field_value(document, field: "published_display"))
    location_string = "Architecture Library Maps and Plans - Flat Files, Drawer #{render_document_show_field_value(document, field: "drawer_display")}"
    call_number = render_document_show_field_value(document, field: "lc_callnum_display")
    if call_number.present?
      location_string += " (#{call_number})"
    end
    subheadings += content_tag(:p, location_string)
    content_tag(:div, subheadings, class: "document-subheadings")
  end

  ##
  # Render the document "heading" (title) in a content tag
  # @overload render_document_heading(tag)
  # @overload render_document_heading(document, options)
  #   @params [SolrDocument] document
  #   @params [Hash] options
  #   @options options [Symbol] :tag
  def render_document_heading(*args)
    options = args.extract_options!
    if args.first.is_a? SolrDocument
      document = args.shift
      tag = options[:tag]
    else
      document = @document
      tag = args.first || options[:tag]
    end

    tag ||= :h4

    heading = content_tag(tag, render_field_value(document_heading(document)))
    heading += render_document_subheadings(document)
  end
end
