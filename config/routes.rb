Rails.application.routes.draw do
  resources :lists, only: [:index]
  post "/sorted", to: "lists#sorted"
end
