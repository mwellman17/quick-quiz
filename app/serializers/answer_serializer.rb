class AnswerSerializer < ActiveModel::Serializer
  attributes :id, :text, :correct_answer, :letter

  has_many :questions do
    object.questions.order(number: :asc)
  end
end
