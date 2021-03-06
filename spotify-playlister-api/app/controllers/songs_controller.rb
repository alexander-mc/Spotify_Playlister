class SongsController < ApplicationController
    before_action :is_valid_user
    before_action only: [:create, :destroy] do
        is_valid_playlist(params[:playlist_id])
    end

    def create
        playlist = current_playist(params[:playlist_id])
        song = playlist.songs.create_with(song_params).find_or_create_by(spotify_id: song_params[:spotify_id])
        if song.errors.full_messages.blank?
            song_hash = song.attributes
            song_hash[:playlistIds] = song.playlists.map{ | playlist | playlist.id }
            render json: song_hash
        else
            render json: { errors: song.errors.full_messages }
        end
    end

    private

    def song_params
        params.require(:song).permit(:title, :album_name, :url, :spotify_id, :artists => [])
    end

end