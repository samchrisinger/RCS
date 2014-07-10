observations = Observation.all
users = User.all

pics = Dir.glob('/home/sam/Downloads/pics/*')
max = pics.length-1

uploader = PhotoUploader.new

observations.each do |o|  
  p = Photo.new

  begin
    r_pic = pics[Random.rand(0..max)]
    r_pic = File.open(r_pic)  
    p.photo = r_pic
    p.save!
    r_pic.close()
  rescue Exception=>e
    debugger
  end
  o.photo_id = Photo.last.id
  o.save!
end
