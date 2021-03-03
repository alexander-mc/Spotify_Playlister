class PlaylistsController < ApplicationController
    before_action :is_valid_user
    before_action :is_valid_playlist, only: [:update, :destroy]

    def create
        playlist = Playlist.new(playlist_params)

        if playlist.save
            render json: {
                id: playlist.id,
                name: playlist.name,
                userId: playlist.user.id
            }
        else
            render json: {
                errors: playlist.errors.full_messages
            }
        end
        
    end

    def destroy
        current_playlist.destroy
        render json: {message: 'Success'}
    end

    private

    def playlist_params
        params.require(:playlist).permit(:name, :user_id)
    end

    def current_playlist
        current_user.playlists.find_by(id: params[:id])
    end

    def is_valid_playlist
        if !current_playlist
            render json: {errors: ["That playlist could not be found"]}
        end

        return true
    end

end