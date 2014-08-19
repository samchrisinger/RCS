tr = {
  :lat=>38.26837,
  :lon=>-78.81591
}
br = {
  :lat=>37.71641,
  :lon=>-77.70355
}

observations = Observation.where(true)
ldiff = tr[:lat] - br[:lat]
rdiff = br[:lon] - tr[:lon]
observations.each do |o|
  lat = br[:lat]+(rand*ldiff)
  lon = tr[:lon]+(rand*rdiff)
  o.lat = lat
  o.lon = lon
  o.save
end

