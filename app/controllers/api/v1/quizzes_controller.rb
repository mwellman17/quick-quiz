class Api::V1::QuizzesController < ApplicationController
    before_action :authenticate_user!, except: [:show]
    protect_from_forgery unless: -> { request.format.json? }
    serialization_scope :current_user

    def index
        quizzes = current_user.quizzes
        render json: {
            quizzes: quizzes
        }
    end

    def show
        array = params[:id].split("=:")
        id = array[0]
        name = array[1]
        if Quiz.exists?(id)
            quiz = Quiz.find(id)
            if quiz.name.gsub(/(\s+|\/+)/, '') == name
                questions = quiz.questions
                render json: {
                    quiz: quiz,
                    questions: ActiveModel::Serializer::CollectionSerializer.new(questions, serializer: QuestionSerializer)
                }
            else
                render json: { error: "Not found."}
            end
        else
        render json: { error: "Not found."}
        end
    end
end