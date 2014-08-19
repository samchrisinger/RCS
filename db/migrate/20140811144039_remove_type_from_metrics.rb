class RemoveTypeFromMetrics < ActiveRecord::Migration
  def up
    remove_column :metrics, :type
    add_column :metric_types, :type, :string, :after=>:name
  end

  def down
  end
end
