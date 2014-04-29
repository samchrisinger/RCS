class CreateMetricTypes < ActiveRecord::Migration
  def change
    create_table :metric_types do |t|
      t.string :name
      t.text :description
      t.float :min
      t.float :max
      t.timestamps
    end
  end
end
