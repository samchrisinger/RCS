class Report < MetaRecord
  attr_accessible :lat, :lon, :message, :photo # inherits :metadata from MetaRecord
  
  def type
    return Report_type.find(:report_type_id)
  end   

  # inherits instance method meta(data) from MetaRecord
end
