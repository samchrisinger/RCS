require 'meta.rb'

class Photo < MetaRecord
  # inherits :metadata from MetaRecord
  # inherits instance method meta(data) from MetaRecord  
  mount_uploader :photo, PhotoUploader  

  def as_json(options=nil)    
    owner = Observation.where(:photo_id=>id).first() || Report.where(:photo_id=>id).first()
    @photo = {
      :id=>id,
      :url=>photo.url,
      :lat=>nil,
      :lon=>nil      
    }
    if owner.nil?
      return @photo
    end
    
    p @photo
    owner_type = owner.class.name.downcase
    owner_id = owner.id
    lat = owner.lat
    lon = owner.lon
    
    @photo[:owner_type] = owner_type
    @photo[:owner_id] = owner_id
    @photo[:lat] = lat
    @photo[:lon] = lon
    return @photo
  end
end
