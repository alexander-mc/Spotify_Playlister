class CreateSongs < ActiveRecord::Migration[6.0]
  def change
    create_table :songs do |t|
      t.string :title
      t.string :artists
      t.string :album
      t.string :genres

      t.timestamps
    end
  end
end
