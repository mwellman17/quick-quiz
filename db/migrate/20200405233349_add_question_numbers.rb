class AddQuestionNumbers < ActiveRecord::Migration[5.2]
  def change
    add_column :questions, :number, :integer, null:false
  end
end
