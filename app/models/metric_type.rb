class MetricType < ActiveRecord::Base
  self.inheritance_column = :_type_disabled
  attr_accessible :name, :description, :min, :max, :type
end
