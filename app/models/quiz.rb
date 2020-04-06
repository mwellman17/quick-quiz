class Quiz < ApplicationRecord
    validates :name, presence: true

    has_many :questions, :dependent => :delete_all
end
