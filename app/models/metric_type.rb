class MetricType < ActiveRecord::Base
  attr_accessible :name, :description, :min, :max
end
