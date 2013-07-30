class CreateFlatFileImports < ActiveRecord::Migration
  def change
    create_table :flat_file_imports do |t|
      t.integer :record_count
      t.timestamps
    end
  end
end
