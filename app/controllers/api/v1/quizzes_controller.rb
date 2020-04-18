class Api::V1::QuizzesController < ApplicationController
    before_action :authenticate_user!, except: [:show]
    protect_from_forgery unless: -> { request.format.json? }
    serialization_scope :current_user

    def index
        if current_user.admin
            quizzes = Quiz.all
        else
            quizzes = current_user.quizzes.order(name: :asc)
        end
        render json: {
            user: current_user.id,
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

    def create
        response = JSON.parse(request.body.read)
        user = User.find(response['user'])
        quiz_attributes = {
            user: user,
            name: response['quiz']['name']
        }
        quiz = Quiz.new(quiz_attributes)
        if quiz.save
            response['questions'].each do |q|
                question_attributes = {
                    text: q['text'],
                    image_url: q['image_url'],
                    number: q['number'],
                    quiz: quiz
                }
                question = Question.new(question_attributes)
                question.save
                q['answers'].each do |a|
                    answer_attributes = {
                        text: a['text'],
                        correct_answer: a['correct_answer'],
                        letter: a['letter'],
                        question: question
                    }
                    new_answer = Answer.new(answer_attributes)
                    new_answer.save
                end
            end
            render json: {
                quiz: quiz,
                questions: ActiveModel::Serializer::CollectionSerializer.new(quiz.questions, serializer: QuestionSerializer)
            }
        else
            render json: { error: quiz.errors.full_messages.join(', ') }
        end
    end

    def update
        response = JSON.parse(request.body.read)
        quiz = Quiz.find(response['quiz']['id'])
        quiz.name = response['quiz']['name']
        if quiz.save
            questions_to_save = []
            response['questions'].each do |q|
                if q['id']
                    question = Question.find(q['id'])
                    question.text = q['text']
                    question.image_url = q['image_url']
                    question.number = q['number']
                    questions_to_save << q['id'].to_i
                    if question.save
                        answers_to_save = []
                        q['answers'].each do |a|
                            if a['id']
                                answer = Answer.find(a['id'])
                                answer.text = a['text']
                                answer.correct_answer = a['correct_answer']
                                answer.letter = a['letter']
                                answers_to_save << a['id'].to_i
                                answer.save
                            else
                                answer_attributes = {
                                    text: a['text'],
                                    correct_answer: a['correct_answer'],
                                    letter: a['letter'],
                                    question: question
                                }
                                new_answer = Answer.new(answer_attributes)
                                new_answer.save
                                answers_to_save << new_answer.id
                            end
                        end
                        question.answers.each do |a|
                            if !answers_to_save.include?(a.id)
                                a.destroy
                            end
                        end
                    else
                        render json: { error: question.errors.full_messages.join(', ') }
                    end
                else
                    question_attributes = {
                        text: q['text'],
                        image_url: q['image_url'],
                        number: q['number'],
                        quiz: quiz
                    }
                    question = Question.new(question_attributes)
                    question.save
                    questions_to_save << question.id
                    q['answers'].each do |a|
                        answer_attributes = {
                            text: a['text'],
                            correct_answer: a['correct_answer'],
                            letter: a['letter'],
                            question: question
                        }
                        new_answer = Answer.new(answer_attributes)
                        new_answer.save
                    end
                end
            end
            quiz.questions.each do |q|
                if !questions_to_save.include?(q.id)
                    q.destroy
                end
            end
            render json: {
                quiz: quiz,
                questions: ActiveModel::Serializer::CollectionSerializer.new(quiz.questions, serializer: QuestionSerializer)
            }
        else
            render json: { error: quiz.errors.full_messages.join(', ') }
        end
    end
end