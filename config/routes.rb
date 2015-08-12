Rails.application.routes.draw do
  resources :lists, only: [:index, :create, :destroy]
  post "/sorted", to: "lists#sorted"
  resources :tasks, only: [:create, :destroy]
  post "/list_tasks", to: "tasks#list_tasks"
  post "/status-change", to: "tasks#status_change"
  root "lists#index"
end
