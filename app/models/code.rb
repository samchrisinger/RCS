class Code < ActiveRecord::Base
  attr_accessible :value
  
  has_one :user
  has_many :session

  def valid?
    t = Date.current
    start_date < t and t < end_date
  end
end
