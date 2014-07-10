class AddPhotos < ActiveRecord::Migration
  def up
    create_table :photos do |t|
      t.string :photo
    end
  end

  def down
  end
end
