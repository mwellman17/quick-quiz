class Answer < ApplicationRecord
    validates :text, presence: true
    validates :letter, presence: true

    belongs_to :question
end
