class Api::V1::ResultsController < ApplicationController
    protect_from_forgery unless: -> { request.format.json? }

    def create
        response = JSON.parse(request.body.read)
        user_id = response['user']
        user = User.exists?(user_id) ? User.find(user_id) : nil
        quiz_id = response['quizId']
        if Quiz.exists?(quiz_id)
            quiz = Quiz.find(quiz_id)
            result_attributes = {
                user: user,
                total_points: response['totalPoints'],
                picks: response['picks'],
                quiz: quiz
            }
            result = Result.new(result_attributes)
            if result.save
                render json: { success: 'Results successfully saved' }
            else
                render json: { error: result.errors.full_messages.join(', ') }
            end
        else
            render json: { error: "Quiz not found."}
        end
    end
end