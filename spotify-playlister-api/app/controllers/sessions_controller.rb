class SessionsController < ApplicationController

    def create
        # Case insensitive name finder
        user = User.find_by_ci_username(session_params[:username])

        if user.try(:authenticate, session_params[:password])
            session[:user_id] = user.id
            render json: {
              id: user.id,
              username: user.username,
              isLoggedIn: true
            }
        else
            render json: { 
                errors: ["Sorry, that username and/or password could not be found."]
              }
        end
    end

    def destroy
        logout!
        render json: { isLoggedIn: false }
    end

    # Gets called in componentDidMount methods
    def is_logged_in?

        if logged_in?
          uniq_songs = current_user.songs.uniq{ |s| s.id }.map { | song | update_song(song) }

          render json: {
            user: {
              isLoggedIn: true,
              id: current_user.id,
              username: current_user.username
              },
            playlists: current_user.playlists,
            songs: uniq_songs
          }

        else
          render json: { user: {isLoggedIn: false} }
        end
    end

    private

    def session_params
        params.require(:user).permit(:username, :password)
    end

end