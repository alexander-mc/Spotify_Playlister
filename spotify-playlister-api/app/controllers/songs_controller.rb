class SongsController < ApplicationController

    before_action :is_valid_user
    before_action only: [:create, :update] do
        is_valid_playlist(params[:playlist_id])
    end
    
    before_action :is_valid_song, only: :update

    def create
        song = Song.update_or_create(song_params, params[:playlist_id])

        render json: song.errors.full_messages.blank? ?
            update_song(song) : 
            { errors: song.errors.full_messages }
    end

    # Updates song's join table (NOTE: this does not delete the song)
    def update
        current_song.playlist_songs.find_by(playlist_id: params[:playlist_id]).destroy       
        render json: update_song(current_song)
    end

    private

    def song_params
        params.require(:song).permit(:title, :album_name, :url, :spotify_id, :artists => [])
    end

    def current_song
        current_song ||= Song.all.find_by(id: params[:id])
    end

    def is_valid_song
        render json: {errors: ["That song could not be found"]} if !current_song
        return true
    end

end