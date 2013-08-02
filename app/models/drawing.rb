class Drawing < ActiveRecord::Base
  before_destroy :remove_from_index

  attr_accessible :identifier,
    :drawer,
    :title,
    :author,
    :publisher,
    :publish_location,
    :publish_year,
    :sheet_count,
    :media,
    :height_centimeters,
    :width_centimeters,
    :content_year,
    :description,
    :subject_string,
    :function_type,
    :system_number,
    :call_number,
    :oclc_number,
    :to_scale

  def subjects
    subject_string.to_s.split(/(\r\n?|\r?\n)/).reject{|value| value.blank?}
  end

  def authors
    original = author.to_s
    if original =~ /;/
      split = original.split(/; */)
    elsif original =~ / and /
      split = original.split(/ and /)
    elsif original =~ / & /
      split = original.split(/ & /)
    else
      split = [original]
    end
    split.reject{|value| value.blank?}
  end

  def solr_id
    "drawing-#{id}"
  end

  def content_year_value
    match = content_year.to_s.match(/[0-9]{4}/)
    if match
      year = match[0]
      if content_year =~ /before/
        year -= 1
      end
      year
    else
      nil
    end
  end

  def published_display
    display = ""
    if publish_location.present?
      display += "#{publish_location}: "
    end
    publisher_and_year = [publisher,publish_year].reject{|s| s.blank?}.join(", ")
    display += publisher_and_year
  end

  def size_display
    "#{width_centimeters} x #{height_centimeters} cm"
  end

  def system_numbers
    if system_number.present?
      ["ndu_aleph#{system_number}", system_number, system_number.to_i.to_s].uniq
    end
  end

  def to_solr
    {
      id: solr_id,
      title_display: title,
      title_t: title,
      title_sort: title,
      author_facet: authors,
      author_t: authors,
      author_display: author,
      author_sort: author,
      year_t: content_year_value,
      year_sort: content_year_value,
      year_display: content_year,
      published_display: published_display,
      subject_facet: subjects,
      subject_t: subjects,
      media_facet: media,
      media_display: media,
      drawer_display: drawer,
      note_display: description,
      size_display: size_display,
      system_number_t: system_numbers,
      system_number_display: system_number,
      lc_callnum_display: call_number,
      import_id_i: (import_id || 0)
    }.reject{|key, value| value.blank?}
  end

  def add_solr
    self.class.solr.add to_solr
  end

  def self.solr
    Blacklight.solr
  end

  def self.reindex_solr
    self.all.each do |drawing|
      drawing.add_solr
    end
    self.commit_solr
  end

  def self.commit_solr
    self.solr.commit
  end

  def self.last_import_id
    self.maximum(:import_id)
  end

  def self.inactive_drawings
    where("import_id > ?",self.last_import_id)
  end

  def self.destroy_inactive_drawings
    self.inactive_drawings.destroy_all
    self.commit_solr
  end

  def remove_from_index
    self.class.solr.delete_by_id(self.solr_id)
    self.class.commit_solr
  end
end
