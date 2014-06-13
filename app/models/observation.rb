require 'meta.rb'

class Observation < MetaRecord
  before_save :defaults

  attr_accessible :user_id, :lat, :lon, :timestamp, :participants, :guardian, :rcs_test_kit_use, :photo, :comment, :metrics # inherits :metadata from MetaRecord

  has_one :user

  has_many :metrics

  # inherits instance method meta(data) from MetaRecord
  
  def defaults
    self.participants = 1
    self.guardian = false
    self.rcs_test_kit_use = false
  end
end

