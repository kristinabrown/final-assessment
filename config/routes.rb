Rails.application.routes.draw do
  resources :lists, only: [:index, :create]
  post "/sorted", to: "lists#sorted"
  resources :tasks, only: [:create, :destroy]
  put "/status-change", to: "tasks#status_change"
  root "lists#index"
end
