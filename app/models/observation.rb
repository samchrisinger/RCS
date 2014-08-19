require 'meta.rb'

class Observation < MetaRecord

  attr_accessible :user_id, :lat, :lon, :timestamp, :participants, :guardian, :rcs_test_kit_use, :photo_id, :comment, :metrics # inherits :metadata from MetaRecord

  has_many :metrics
  has_one :photo

  # inherits instance method meta(data) from MetaRecord  

  def as_json(options=nil)
    photo_url = nil
    begin
      o_photo = Photo.find(photo_id)
<<<<<<< HEAD
      photo_url =  o_photo.photo.url
    rescue      
    end
   
=======
      if not o_photo.nil?
        photo_url = o_photo.photo.url
      end
    rescue
      p 'no photo'
    end

>>>>>>> 42fbcc89cc5f5b1e0755e87d0a7d41f27ea205fc
    ret = {
      :observer=>User.find(user_id),
      :id=>id,
      :lat=>lat,
      :lon=>lon,
      :timestamp=>timestamp,
      :participants=>participants,
      :guardian=>guardian,
      :rcs_test_kit_use=>rcs_test_kit_use,
      :photo_id=>photo_id,
      :photo_url=>photo_url,
      :comment=>comment,
      :metadata=>metadata,
      :metrics_count=>metrics.length
    }
    if options[:with_metrics]
      ret[:metrics] = metrics
    end
    return ret
  end
end

