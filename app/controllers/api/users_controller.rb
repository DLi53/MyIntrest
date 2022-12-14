class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + ['password']

  def index
    @users = User.all
    # render json:{message: 'hi'}
    render :index
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login(@user)
      board = Board.create!({title: 'All Pins', user_id: @user.id})

      render :show

    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  private
  def user_params
    params.require(:user).permit(:username, :password)
  end
end
