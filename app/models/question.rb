class Question < ApplicationRecord
    validates :text, presence: true
    validates :number, presence: true

    has_many :answers, :dependent => :delete_all
    belongs_to :quiz
end
