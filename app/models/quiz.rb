class Quiz < ApplicationRecord
    validates :name, presence: true

    has_many :questions, :dependent => :delete_all
    has_many :results, :dependent => :delete_all
    belongs_to :user
end
