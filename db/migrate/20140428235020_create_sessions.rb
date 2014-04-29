class CreateSessions < ActiveRecord::Migration
  def change
    create_table :sessions do |t|
      t.integer :code_id
      t.string :token
      t.timestamps
    end
  end
end
