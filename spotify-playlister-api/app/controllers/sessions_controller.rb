class SessionsController < ApplicationController

    def create
        # Case insensitive name finder
        user = User.find_by_ci_username(session_params[:username])

        if user.try(:authenticate, session_params[:password])
            session[:user_id] = user.id
            render json: {
                logged_in: true,
                user: { id: user.id, username: user.username }
            }
        else
            render json: { 
                status: 401,
                errors: ["Sorry, that username and/or password could not be found."]
              }
        end
    end

    def destroy
        logout!
        render json: {
            status: 200,
            logged_out: true
        }
    end

    # Gets called when app.js component is mounted
    def is_logged_in?
        if logged_in?
          render json: {
            logged_in: true,
            user: current_user
          }
        else
          render json: {
            logged_in: false,
            message: 'Sorry, this is not a valid user.'
          }
        end
    end

    private

    def session_params
        params.require(:user).permit(:username, :password)
    end

end