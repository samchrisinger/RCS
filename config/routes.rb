RCS::Application.routes.draw do
  devise_for :users
  
  resources :users, :defaults => { :format => 'json' }
  resources :reports, :defaults => { :format => 'json' }
  resources :news, :defaults => { :format => 'json' }
  resources :observations, :defaults => { :format => 'json' }
  resources :metric_types, :defaults => { :format => 'json' }
  
  
  post '/mobile/users/sign_in', to: 'users#mobile_login'

  root to: 'home#index'
end
