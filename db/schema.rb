# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130730185109) do

  create_table "bookmarks", :force => true do |t|
    t.integer  "user_id",     :null => false
    t.string   "document_id"
    t.string   "title"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
    t.string   "user_type"
  end

  create_table "drawings", :force => true do |t|
    t.integer  "import_id"
    t.integer  "import_row"
    t.string   "system_number"
    t.string   "identifier"
    t.string   "drawer",             :limit => 2
    t.string   "title"
    t.string   "author"
    t.string   "publisher"
    t.string   "publish_location"
    t.string   "publish_year"
    t.string   "sheet_count"
    t.string   "media"
    t.string   "height_centimeters"
    t.string   "width_centimeters"
    t.string   "content_year"
    t.string   "description"
    t.string   "subject_string"
    t.string   "function_type"
    t.string   "call_number"
    t.string   "oclc_number"
    t.boolean  "to_scale"
    t.datetime "created_at",                      :null => false
    t.datetime "updated_at",                      :null => false
  end

  add_index "drawings", ["identifier"], :name => "index_drawings_on_identifier"
  add_index "drawings", ["import_id"], :name => "index_drawings_on_import_id"
  add_index "drawings", ["system_number"], :name => "index_drawings_on_system_number"

  create_table "flat_file_imports", :force => true do |t|
    t.integer  "record_count"
    t.integer  "new_record_count"
    t.integer  "updated_record_count"
    t.integer  "deleted_record_count"
    t.boolean  "processed"
    t.datetime "created_at",               :null => false
    t.datetime "updated_at",               :null => false
    t.string   "import_file_file_name"
    t.string   "import_file_content_type"
    t.integer  "import_file_file_size"
    t.datetime "import_file_updated_at"
  end

  create_table "searches", :force => true do |t|
    t.text     "query_params"
    t.integer  "user_id"
    t.datetime "created_at",   :null => false
    t.datetime "updated_at",   :null => false
    t.string   "user_type"
  end

  add_index "searches", ["user_id"], :name => "index_searches_on_user_id"

end
