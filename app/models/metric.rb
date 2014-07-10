class Metric < ActiveRecord::Base
  attr_accessible :value, :metric_type_id

  validates :value, presence: true
  validates_associated :observation

  has_one :observation

  def type
    return MetricType.find(metric_type_id)
  end

  def as_json(options=nil)
    return {
      :type=>type,
      :value=>value
    }
  end
end
