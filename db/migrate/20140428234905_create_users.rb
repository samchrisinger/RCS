class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.boolean :admin
      t.boolean :guardian
      t.string :token
      t.timestamps
    end
  end
end
