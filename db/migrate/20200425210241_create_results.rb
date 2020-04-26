class CreateResults < ActiveRecord::Migration[5.2]
  def change
    create_table :results do |t|
      t.belongs_to :quiz
      t.integer :total_points, null: false
      t.json :picks, default: {}

      t.timestamps
    end
  end
end
