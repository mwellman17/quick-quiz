class CreateAnswers < ActiveRecord::Migration[5.2]
  def change
    create_table :answers do |t|
        t.string :text, null: false
        t.string :letter, null: false
        t.boolean :correct_answer, default: false
        t.belongs_to :question

      t.timestamps
    end
  end
end
