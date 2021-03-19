class ApplicationController < ActionController::Base

    # Below is a security token that Rails generates from our session data and adds to the parameters sent from a Rails form to a controller action to prevent cross-site request forgery (CSRF) attacks. Since we are treating our back-end as an API, we should disable this so that we don’t receive ‘forbidden’ parameters that will prevent our controller actions from executing without errors.
    # Source: https://medium.com/how-i-get-it/react-with-rails-user-authentication-8977e98762f2
    skip_before_action :verify_authenticity_token

    def current_user
        current_user ||= User.find_by(id: session[:user_id])
    end
    
    def logged_in?
        !!current_user
    end
    
    def logout!
        session.clear
    end

    def is_valid_user
        render json: {errors: ["User could not be found"]} if !current_user
        return true
    end

    def current_playlist(playlist_id)
        current_playlist ||= current_user.playlists.find_by(id: playlist_id)
    end

    def is_valid_playlist(playlist_id)
        render json: {errors: ["That playlist could not be found"]} if !current_playlist(playlist_id)
        return true
    end

    def update_song(song)
        song_hash = song.attributes
        song_hash[:playlistIds] = song.playlists.map { |p| p.id }
        song_hash
    end

end