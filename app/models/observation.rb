require 'meta.rb'

class Observation < MetaRecord

  attr_accessible :user_id, :lat, :lon, :timestamp, :participants, :guardian, :rcs_test_kit_use, :photo, :comment, :metrics # inherits :metadata from MetaRecord

  has_one :user

  has_many :metrics

  # inherits instance method meta(data) from MetaRecord  
end

