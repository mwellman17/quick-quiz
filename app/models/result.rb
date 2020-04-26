class Result < ApplicationRecord
    validates :total_points, presence: true

    belongs_to :quiz
    belongs_to :user, optional: true
end
