class CreateTownCounts < ActiveRecord::Migration
  def change
    create_table :town_counts do |t|
      t.column :town, :string
      t.column :count, :integer
      t.column :year, :integer
      t.timestamps
    end

    add_index :town_counts, :year
    add_index :town_counts, :town
  end
end
