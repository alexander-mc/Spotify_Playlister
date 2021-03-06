class SongsController < ApplicationController
    before_action :is_valid_user
    before_action only: [:create, :destroy] do
        is_valid_playlist(params[:playlist_id])
    end

    def create
        playlist = current_playist(params[:playlist_id])
        binding.pry
        playlist.songs.create_with(song_params).find_or_create_by(spotify_id: song_params[:spotify_id])

        # song = Song.update_or_create()
        binding.pry
        render json: song
    end

    private

    def song_params
        binding.pry
        params.require(:song).permit(:title, :album_name, :url, :spotify_id, :artists => [])
    end

end