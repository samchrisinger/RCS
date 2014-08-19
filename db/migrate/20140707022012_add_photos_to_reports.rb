class AddPhotosToReports < ActiveRecord::Migration
  def change
    add_column :reports, :photo_id, :integer
  end
end
