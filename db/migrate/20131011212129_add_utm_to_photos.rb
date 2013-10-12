class AddUtmToPhotos < ActiveRecord::Migration
  def change
    add_column :photos, :utm_easting, :string
    add_column :photos, :utm_northing, :string
    add_column :photos, :photographer, :string
    add_column :photos, :location, :boolean
    add_column :photos, :photo_source, :string
    add_column :photos, :title, :string

    add_index :photos, :title
    add_index :photos, :location
  end
end
