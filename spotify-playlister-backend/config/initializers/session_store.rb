if Rails.env === 'production' 
    Rails.application.config.session_store :cookie_store, key: '_spotify-playlister', domain: 'spotify-playlister'
  else
    Rails.application.config.session_store :cookie_store, key: '_spotify-playlister'
  end
  