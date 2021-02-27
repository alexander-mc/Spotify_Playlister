class UsersController < ApplicationController
    # before_action :redirect_if_logged_in, only: [:new]

    # def new
    #     @user = User.new # do we need the @???
    # end

    def create
        user = User.new(user_params)

        if user.save
            session[:user_id] = user.id

            render json: {
                status: :created,
                user: { id: user.id, username: user.username }
            }
        else
            render json: {
                status: 500,
                errors: user.errors.full_messages
            }
        end
    end

    private

    def user_params
        params.require(:user).permit(:username, :password, :password_confirmation)
    end

end
