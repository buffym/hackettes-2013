class CreatePhotos < ActiveRecord::Migration
  def change
    create_table :photos do |t|
      t.column :ls_id, :integer
      t.column :sequence, :integer
      t.column :filename, :string
      t.column :county, :string
      t.column :town, :string
      t.column :year, :integer
      t.column :description, :string, :length => 2000
      t.column :keywords, :string
      t.column :latitude, :string
      t.column :longitude, :string
      t.column :url, :string
      t.timestamps
    end

    add_index :photos, :ls_id
    add_index :photos, :sequence
    add_index :photos, :county
    add_index :photos, :town
    add_index :photos, :year
    add_index :photos, :keywords
    add_index :photos, :description
  end
end
