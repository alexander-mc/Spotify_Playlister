Rails.application.routes.draw do
  
  resources :users, only: [:create] do
    resources :playlists, only: [:create, :destroy] do
      resources :songs, only: [:create, :update]
    end
  end

  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/logged_in', to: 'sessions#is_logged_in?'

end