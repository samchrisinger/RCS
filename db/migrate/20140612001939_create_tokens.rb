class CreateTokens < ActiveRecord::Migration
  def up
    create_table :tokens do |t|
      t.integer :user_id
      t.string :token      
    end
  end

  def down
  end
end
