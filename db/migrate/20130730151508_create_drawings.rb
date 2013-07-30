class CreateDrawings < ActiveRecord::Migration
  def change
    create_table :drawings do |t|
      t.string :drawer, limit: 2
      t.string :title
      t.string :author
      t.string :publisher
      t.string :publish_location
      t.string :publish_year
      t.string :sheet_count
      t.string :media
      t.string :height_centimeters
      t.string :width_centimeters
      t.string :content_year
      t.string :description
      t.string :subject_string
      t.string :function_type
      t.string :system_number
      t.string :call_number
      t.string :oclc_number
      t.boolean :to_scale
      t.timestamps
    end
  end
end
