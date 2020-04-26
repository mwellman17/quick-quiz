Rails.application.routes.draw do
    root 'quizzes#index'
    devise_for :users
    resources :quizzes, only: [:index, :show]

    namespace :api do
        namespace :v1 do
            resources :quizzes, only: [:index, :show, :update, :create]
            resources :results, only: [:create]
        end
    end
end
