class CreateFlatFileImports < ActiveRecord::Migration
  def change
    create_table :flat_file_imports do |t|
      t.integer :record_count
      t.integer :new_record_count
      t.integer :updated_record_count
      t.integer :deleted_record_count
      t.boolean :processed
      t.timestamps
    end
  end
end
