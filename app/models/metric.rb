class Metric < ActiveRecord::Base
  attr_accessible :value

  def observation 
    return Observation.find(:observation_id)
  end

  def type
    return Metric_type.find(:metric_type_id)
  end
end
