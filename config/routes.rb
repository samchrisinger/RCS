RCS::Application.routes.draw do
  devise_for :users
  
  resources :users, :defaults => { :format => 'json' }
  resources :reports, :defaults => { :format => 'json' }
  resources :news, :defaults => { :format => 'json' }
  resources :observations, :defaults => { :format => 'json' }
  
  root to: 'home#index'
end
