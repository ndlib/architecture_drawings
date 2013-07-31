class FlatFileImport < ActiveRecord::Base
  attr_accessible :import_file
  has_attached_file :import_file
  validates :import_file, :attachment_presence => true
  validates_format_of :import_file_file_name, with: %r{\.xls(x)?$}i, message: "must be an Excel file ending in .xls or .xlsx", allow_nil: true
  attr_accessor :duplicates

  COLUMN_MAP = [
    :drawer,
    :title,
    :author,
    nil,
    nil,
    :publish_location,
    :publisher,
    :publish_year,
    :sheet_count,
    nil,
    :media,
    :height_centimeters,
    :width_centimeters,
    nil,
    :content_year,
    :description,
    :subject_string,
    :function_type,
    :system_number,
    :call_number,
    :oclc_number,
    :to_scale
  ]

  def process_import_file!
    self.record_count = 0
    self.new_record_count = 0
    self.duplicates = []
    if import_file.original_filename =~ /xls$/
      spreadsheet = Roo::Excel.new(import_file.path)
    else
      spreadsheet = Roo::Excelx.new(import_file.path)
    end
    (2..spreadsheet.last_row).each do |i|
      row = spreadsheet.row(i)
      process_row(row)
    end
    Drawing.commit_solr
    self.processed = true
    self.save
  end

  def process_row(row)
    data = {}
    COLUMN_MAP.each_with_index do |field, index|
      if field.present?
        data[field] = row[index]
      end
    end
    if data[:to_scale] == "Yes"
      data[:to_scale] = true
    else
      data[:to_scale] = false
    end
    if data[:oclc_number] == "N/A"
      data[:oclc_number] = nil
    end
    if data[:publish_year] == "?"
      data[:publish_year] = nil
    end
    data[:identifier] = Digest::SHA1.hexdigest(data[:title])
    drawing = nil
    if data[:system_number].present?
      drawing = Drawing.where(system_number: data[:system_number]).first
    end
    if drawing.nil?
      drawing = Drawing.where(identifier: data[:identifier]).first
    end
    if drawing.nil?
      drawing = Drawing.new
      self.new_record_count += 1
    else
      self.duplicates << [drawing.inspect, data]
    end
    begin
      drawing.update_attributes!(data)
    rescue Exception => e
      raise "#{e.message}, #{drawing.inspect}"
    end
    self.record_count += 1
    drawing.add_solr
  end
end
