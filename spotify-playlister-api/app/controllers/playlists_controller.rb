class PlaylistsController < ApplicationController
    # before_action :redirect_if_logged_in, only: [:new]

    # TODO: Place a before_action to validate that user_id matches user who is logged in

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
                status: 500,
                errors: playlist.errors.full_messages
            }
        end
        
    end

    def destroy
        Playlist.find_by(id: params[:id]).destroy
    end

    private

    def playlist_params
        params.require(:playlist).permit(:name, :user_id)
    end

end