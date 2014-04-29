RCS::Application.routes.draw do

  get 'home/index', to: 'home#index'

  devise_for :users

  resources :users


  root to: 'home#index'
end
