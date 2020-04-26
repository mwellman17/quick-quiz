class AddResultUser < ActiveRecord::Migration[5.2]
  def change
    change_table :results do |t|
        t.belongs_to :user, optional: true
    end
  end
end
