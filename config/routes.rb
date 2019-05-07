Rails.application.routes.draw do

  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)

  admin = lambda { |request| request.env['warden'].authenticate? && request.env['warden'].user.class == AdminUser }
  require 'sidekiq/web'
  constraints admin do
    mount Sidekiq::Web => '/sidekiq'
    resources :batches
  end

  match '/.well-known/acme-challenge/:id', via: :get, to: proc { |r|
    [
      '200',
      {'Content-Type' => 'text/plain'},
      [[r['action_dispatch.request.path_parameters'][:id], 'Yt8iUj0E9y5g9HQKrBExOrqG4JZiFik94MLZRb3HiFo'].join('.')]
    ]
  }

  root 'pages#home'
  get '/terms', to: 'pages#terms', as: 'terms'
  get '/privacy', to: 'pages#privacy', as: 'privacy'
  get '/apps', to: 'pages#apps', as: 'apps'
  get '/onevoice', to: 'pages#onevoice', as: 'onevoice'
  get '/videos', to: 'pages#videos', as: 'videos'
  get '/2Bq4Pk5ypk7v6Ta.php', to: 'pages#legacy_app_center'

  resources :apps, only: :index
  resources :charges, only: [:create, :new]
  resources :customers, only: [:update, :edit]

  namespace :api do
    resources :apps, only: :index
    resource :customers, only: [:create] do
      post :search
      post :auth
      post :reauth
      post :upgrade
    end
    resources :leads, only: [:create]
    resources :photos, only: [:create, :show]
    resources :video_categories, only: :index do
      resources :videos, only: :index
    end
    resources :words, only: :create
  end

end
