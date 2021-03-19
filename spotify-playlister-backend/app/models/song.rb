class Song < ApplicationRecord

    has_many :playlist_songs
    has_many :playlists, through: :playlist_songs
    has_many :users, through: :playlists

    def self.update_or_create(song_params, playlist_id)

        song = Song.find_by(spotify_id: song_params[:spotify_id])
        playlist = Playlist.find_by(id: playlist_id)

        if song
            # Note: This allows a user to add the same song to a playlist multiple times
            song.playlist_songs.create(playlist_id: playlist_id)
            song
        else
            playlist.songs.create(song_params)
        end

    end

end
