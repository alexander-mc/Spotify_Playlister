class User < ApplicationRecord

    has_many :playlists
    has_many :songs, through: :playlists

    validates :username,
              presence: { message: "was not entered" },
              format: { with: /\A[a-zA-Z0-9]*\z/, message: "can only contain letters and numbers" },
              uniqueness: { case_sensitive: false, message: "is already taken" }
    
    # Set hsp validatons to false in order to customize (see custom validations below)
    has_secure_password (options = { validations: false })

    validates :password,
              presence: { message: "was not entered" },
              length: { minimum: 6, message: "must contain more than 6 characters"},
              format: { without: /\s/, message: "cannot include spaces"},
              confirmation: { message: "did not match password" }

    scope :find_by_ci_username, -> (username) { where('lower("username") = ?', username.downcase).first }

end
