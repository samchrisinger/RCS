class Code < ActiveRecord::Base
  attr_accessible :value
  
  has_one :user
  has_many :session

  def valid?
    t = Time.now
    start_date < t and t < end_date
  end
end
