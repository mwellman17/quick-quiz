class QuizzesController < ApplicationController
    before_action :authenticate_user!, except: [:show]

    def index
    end

    def show
    end
end