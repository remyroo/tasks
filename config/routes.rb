Rails.application.routes.draw do
  root 'pages#home'
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :tasks, except: %i(show edit)
    end
  end
end
