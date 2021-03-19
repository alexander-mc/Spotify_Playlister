class PlaylistsController < ApplicationController
    before_action :is_valid_user
    before_action only: :destroy do
        is_valid_playlist(params[:id])
    end

    def create
        playlist = Playlist.new(playlist_params)

        if playlist.save
            render json: {
                id: playlist.id,
                name: playlist.name,
                userId: playlist.user.id
            }
        else
            render json: { errors: playlist.errors.full_messages }
        end
        
    end

    def destroy
        current_playlist(params[:id]).destroy
        render json: {message: 'Success'}
    end

    private

    def playlist_params
        params.require(:playlist).permit(:name, :user_id)
    end

end