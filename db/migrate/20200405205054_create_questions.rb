class CreateQuestions < ActiveRecord::Migration[5.2]
  def change
    create_table :questions do |t|
        t.string :text, null: false
        t.string :image_url
        t.belongs_to :quiz

      t.timestamps
    end
  end
end
