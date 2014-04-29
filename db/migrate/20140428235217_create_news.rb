class CreateNews < ActiveRecord::Migration
  def change
    create_table :news do |t|
      t.integer :user_id
      t.string :title
      t.text :body
      t.integer :for
      t.timestamps
    end
  end
end
