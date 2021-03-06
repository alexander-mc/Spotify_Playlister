class Song < ApplicationRecord

    has_many :playlist_songs
    has_many :playlists, through: :playlist_songs
    has_many :users, through: :playlists

    def self.update_or_create(song_params)
        binding.pry
    end

end
