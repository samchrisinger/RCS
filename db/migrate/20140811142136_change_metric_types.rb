class ChangeMetricTypes < ActiveRecord::Migration
  def up
    change_table :metrics do |t|
      t.change :value, :string
    end
    add_column :metrics, :type, :string, :after=>:value
  end

  def down
  end
end
