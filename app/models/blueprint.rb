class Blueprint < ActiveRecord::Base
  before_destroy :remove_from_index

  attr_accessible :drawer,
    :title,
    :author,
    :contributor_1,
    :contributor_2,
    :publisher,
    :publishing_location,
    :year,
    :sheet_count,
    :number_of_sheets,
    :media,
    :sheet_size_height,
    :sheet_size_width,
    :sheet_size_depth,
    :note_1,
    :note_2,
    :subject_listing,
    :function_type,
    :system_number,
    :call_number,
    :oclc,
    :to_scale

  def subjects
    subject_listing.to_s.split(/(\r\n?|\r?\n)/).reject{|value| value.blank?}
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
    "blueprint-#{id}"
  end

  def creation_year
    match = note_1.to_s.match(/[0-9]{4}/)
    if match
      year = match[0]
      if note_1 =~ /before/
        year -= 1
      end
      year
    else
      nil
    end
  end

  def to_solr
    {
      :id => solr_id,
      :title_display => title,
      :title_t => title,
      :title_sort => title,
      author_facet: authors,
      author_t: authors,
      author_display: author,
      author_sort: author,
      :year_t => creation_year,
      year_sort: creation_year,
      :year_display => note_1,
      :published_display => "#{publisher} #{publishing_location}",
      :subject_facet => subjects,
      :subject_t => subjects,
      media_facet: media,
      media_display: media,
      drawer_display: drawer,
      note_display: note_2
    }.reject{|key, value| value.blank?}
  end

  def add_solr
    Blacklight.solr.add to_solr
  end

  def self.commit_solr
    Blacklight.solr.commit
  end

  def remove_from_index
    Blacklight.solr.delete_by_id(self.solr_id)
    self.class.commit_solr
  end
end
