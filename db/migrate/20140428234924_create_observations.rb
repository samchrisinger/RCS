class CreateObservations < ActiveRecord::Migration
  def change
    create_table :observations do |t|
      t.integer :user_id
      t.float :lat
      t.float :lon
      t.datetime :timestamp
      t.integer :participants
      t.boolean :guardian
      t.boolean :rcs_test_kit_use
      t.string :photo
      t.text :metadata
      t.timestamps
    end
  end
end
