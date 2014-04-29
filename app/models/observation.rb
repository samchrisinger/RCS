require 'meta.rb'

class Observation < MetaRecord
  attr_accessible :lat, :lon, :timestamp, :participants, :guardian, :rcs_test_kit_use, :photo # inherits :metadata from MetaRecord

  has_one :User

  # inherits instance method meta(data) from MetaRecord
end
