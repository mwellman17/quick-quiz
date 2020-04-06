class QuestionSerializer < ActiveModel::Serializer
  attributes :id, :text, :image_url, :number

  has_many :answers do
    object.answers.order(letter: :asc)
  end
end
