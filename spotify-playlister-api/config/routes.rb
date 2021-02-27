Rails.application.routes.draw do
  
  resources :users, only: [:new, :create] do
    resources :playlists do # delete unnecessary routes later
      resources :songs # delete unnecessary routes later
    end
  end

  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/logged_in', to: 'sessions#is_logged_in?'

end
