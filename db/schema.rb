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

ActiveRecord::Schema.define(:version => 20131011212129) do

  create_table "photos", :force => true do |t|
    t.integer  "ls_id"
    t.integer  "sequence"
    t.string   "filename"
    t.string   "county"
    t.string   "town"
    t.integer  "year"
    t.string   "description"
    t.string   "keywords"
    t.string   "latitude"
    t.string   "longitude"
    t.string   "url"
    t.datetime "created_at",   :null => false
    t.datetime "updated_at",   :null => false
    t.string   "utm_easting"
    t.string   "utm_northing"
    t.string   "photographer"
    t.boolean  "location"
    t.string   "photo_source"
    t.string   "title"
  end

  add_index "photos", ["county"], :name => "index_photos_on_county"
  add_index "photos", ["description"], :name => "index_photos_on_description"
  add_index "photos", ["keywords"], :name => "index_photos_on_keywords"
  add_index "photos", ["location"], :name => "index_photos_on_location"
  add_index "photos", ["ls_id"], :name => "index_photos_on_ls_id"
  add_index "photos", ["sequence"], :name => "index_photos_on_sequence"
  add_index "photos", ["title"], :name => "index_photos_on_title"
  add_index "photos", ["town"], :name => "index_photos_on_town"
  add_index "photos", ["year"], :name => "index_photos_on_year"

end
