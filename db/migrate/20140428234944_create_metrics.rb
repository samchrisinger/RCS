class CreateMetrics < ActiveRecord::Migration
  def change
    create_table :metrics do |t|
      t.integer :observation_id
      t.integer :metric_type_id
      t.float :value
      t.timestamps
    end
  end
end
