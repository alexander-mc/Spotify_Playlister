class CreateSongs < ActiveRecord::Migration[6.0]
  def change
    create_table :songs do |t|
      t.string :title
      t.string :artists
      t.string :album_name
      t.string :url
      t.string :spotify_id

      t.timestamps
    end
  end
end
