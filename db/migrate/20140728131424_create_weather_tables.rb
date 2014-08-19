class CreateWeatherTables < ActiveRecord::Migration
  def up
    create_table :summary_weather do |t|
      t.string :datestring
      t.string :locationstring
      t.text :summary
    end
    create_table :hourly_weather do |t|
      t.string :datestring
      t.string :locationstring      
    end
  end

  def down
  end
end
