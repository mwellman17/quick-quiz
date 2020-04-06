Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users
    resources :quizzes, only: [:index]

    namespace :api do
        namespace :v1 do
            resources :quizzes, only: [:index]
        end
    end
end
