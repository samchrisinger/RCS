class Addcommentstoobservations < ActiveRecord::Migration
  def change
    add_column :observations, :comment, :text
  end
end
