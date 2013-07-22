class BlueprintImport
  COLUMN_MAP = [
    :drawer,
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
  ]

  attr_reader :file

  def initialize(file)
    @file = file
    if file =~ /csv$/
      self.process_csv
    elsif file =~ /xlsx?$/
      self.process_excel
    end
  end

  def process_csv
    require 'csv'
    CSV.read(file, :encoding => 'ISO-8859-1:utf-8').each_with_index do |row,index|
      if index > 0
        process_row(row)
      end
    end
    Blueprint.commit_solr
  end

  def process_excel
    if file =~ /xls$/
      spreadsheet = Roo::Excel.new(file)
    else
      spreadsheet = Roo::Excelx.new(file)
    end
    (2..spreadsheet.last_row).each do |i|
      row = spreadsheet.row(i)
      process_row(row)
    end
    Blueprint.commit_solr
  end

  def process_row(row)
    data = {}
    COLUMN_MAP.each_with_index do |field, index|
      data[field] = row[index]
    end
    if data[:to_scale] == "Yes"
      data[:to_scale] = true
    else
      data[:to_scale] = false
    end
    if data[:oclc] == "N/A"
      data[:oclc] = nil
    end
    if data[:year] == "?"
      data[:year] = nil
    end
    blueprint = nil
    if data[:system_number]
      blueprint = Blueprint.where(system_number: data[:system_number]).first
    else
      blueprint = Blueprint.where(title: data[:title]).first
    end
    if blueprint.nil?
      blueprint = Blueprint.new
    end

    blueprint.update_attributes!(data)
    blueprint.add_solr
  end

  def self.test
    self.new(File.join(Rails.root,"test/fixtures/test-export.xlsx"))
  end

  def self.testencoding
    require 'csv'
    rows = []
    CSV.read(File.join(Rails.root,"test/fixtures/7-22-2013-trial.csv")).each_with_index do |row,index|
      rows << row
    end
    rows
  end
end
