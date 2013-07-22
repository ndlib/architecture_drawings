class CreateBlueprints < ActiveRecord::Migration
  def change
    create_table :blueprints do |t|
      t.string :drawer, limit: 2
      t.string :title
      t.string :author
      t.string :contributor_1
      t.string :contributor_2
      t.string :publisher
      t.string :publishing_location
      t.string :year
      t.string :sheet_count
      t.string :number_of_sheets
      t.string :media
      t.string :sheet_size_height
      t.string :sheet_size_width
      t.string :sheet_size_depth
      t.string :note_1
      t.string :note_2
      t.string :subject_listing
      t.string :function_type
      t.string :system_number
      t.string :call_number
      t.string :oclc
      t.boolean :to_scale
      t.timestamps
    end
  end
end
