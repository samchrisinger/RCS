class CreateReports < ActiveRecord::Migration
  def change
    create_table :reports do |t|
      t.integer :user_id
      t.integer :report_type
      t.float :lat
      t.float :lon
      t.text :message
      t.string :photo
      t.text :metadata
      t.timestamps
    end
  end
end
