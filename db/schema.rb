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

ActiveRecord::Schema.define(:version => 20130722030742) do

  create_table "blueprints", :force => true do |t|
    t.string   "drawer",              :limit => 2
    t.string   "title"
    t.string   "author"
    t.string   "contributor_1"
    t.string   "contributor_2"
    t.string   "publisher"
    t.string   "publishing_location"
    t.string   "year"
    t.string   "sheet_count"
    t.string   "number_of_sheets"
    t.string   "media"
    t.string   "sheet_size_height"
    t.string   "sheet_size_width"
    t.string   "sheet_size_depth"
    t.string   "note_1"
    t.string   "note_2"
    t.string   "subject_listing"
    t.string   "function_type"
    t.string   "system_number"
    t.string   "call_number"
    t.string   "oclc"
    t.boolean  "to_scale"
    t.datetime "created_at",                       :null => false
    t.datetime "updated_at",                       :null => false
  end

  create_table "bookmarks", :force => true do |t|
    t.integer  "user_id",     :null => false
    t.string   "document_id"
    t.string   "title"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
    t.string   "user_type"
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
