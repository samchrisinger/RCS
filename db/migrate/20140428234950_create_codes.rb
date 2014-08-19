class CreateCodes < ActiveRecord::Migration
  def change
    create_table :codes do |t|
      t.integer :user_id
      t.string :value
      t.date :start_date
      t.date :end_date
      t.timestamps
    end
  end
end
