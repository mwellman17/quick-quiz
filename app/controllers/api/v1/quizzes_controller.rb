class Api::V1::QuizzesController < ApplicationController
    protect_from_forgery unless: -> { request.format.json? }

    def index
        quiz = Quiz.first
        questions = Question.all
        render json: {
            quiz: quiz,
            questions: ActiveModel::Serializer::CollectionSerializer.new(questions, serializer: QuestionSerializer)
        }
    end
end