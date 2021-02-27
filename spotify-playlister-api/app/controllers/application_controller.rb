class ApplicationController < ActionController::Base

    # This is a security token that Rails generates from our session data and adds to the parameters sent from a Rails form to a controller action to prevent cross-site request forgery (CSRF) attacks. Since we are treating our back-end as an API, we should disable this so that we don’t receive ‘forbidden’ parameters that will prevent our controller actions from executing without errors.
    # Source: https://medium.com/how-i-get-it/react-with-rails-user-authentication-8977e98762f2
    skip_before_action :verify_authenticity_token

    # why is the below necessary if we are not using views ???
    # Commenting below because methods should already be passed to other controllers
    # helper_method :login!, :logged_in?, :current_user, :authorized_user?, :logout!

    def current_user
        # @current_user ||= User.find(session[:user_id]) if session[:user_id]
        current_user ||= User.find_by(id: session[:user_id])
    end

    # def authorized_user? # what is the point of this?
    #     @user == current_user
    # end   

    # def login!
    #     binding.pry
    #     session[:user_id] = @user.id # how does application know what @user is???
    # end

    def logged_in?
        # !!session[:user_id]
        !!current_user
    end
    
    def logout!
        session.clear
    end

end
