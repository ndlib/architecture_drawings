class AddAttachmentImportFileToFlatFileImports < ActiveRecord::Migration
  def self.up
    change_table :flat_file_imports do |t|
      t.attachment :import_file
    end
  end

  def self.down
    drop_attached_file :flat_file_imports, :import_file
  end
end
