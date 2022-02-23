Rails.application.routes.draw do
  root 'pages#home'

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :tasks, except: %i(show edit)
    end
  end

  get '*path', to: 'pages#home', constraints: lambda { |req|
    req.path.exclude? 'rails/active_storage'
  }

  if Rails.env.test?
    namespace :test do
      post 'reset_database', to: 'databases#reset_database'
    end
  end
end
