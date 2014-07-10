class AddPhotoToObs < ActiveRecord::Migration
  def change
    remove_column :observations, :photo
    add_column :observations, :photo_id, :integer   
  end
end
