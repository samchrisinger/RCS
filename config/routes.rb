<<<<<<< HEAD
RCS::Application.routes.draw do
  match '*path', :controller => 'application', :action => 'handle_options_request', :constraints => {:method => 'OPTIONS'}

  devise_for :users
=======
RCS::Application.routes.draw do  
  match '*path', :controller => 'application', :action => 'handle_options_request', :constraints => {:method => 'OPTIONS'}
>>>>>>> 42fbcc89cc5f5b1e0755e87d0a7d41f27ea205fc

  devise_for :users do post '/users' => 'users#create' end 
  
  resources :users, :defaults => { :format => 'json' }
  resources :reports, :defaults => { :format => 'json' }
  resources :news, :defaults => { :format => 'json' }
  resources :observations, :defaults => { :format => 'json' }
  resources :metric_types, :defaults => { :format => 'json' }
  resources :metrics, :defaults => {:format => 'json'} 
  resources :photos, :defaults => {:format => 'json'} 

  post '/mobile/login', to: 'users#token_login'

  get '/weather', to: 'weather#proxy', :defaults => {:format => 'json'}

  root to: 'home#index'
end
