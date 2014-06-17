class Metric < ActiveRecord::Base
  attr_accessible :value, :metric_type_id

  validates :value, presence: true
  validates_associated :observation

  has_one :observation

  def type
    return Metric_type.find(:metric_type_id)
  end
end
