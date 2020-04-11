class AddOwners < ActiveRecord::Migration[5.2]
  def change
    change_table :quizzes do |t|
        t.belongs_to :user, null: false
    end
  end
end
