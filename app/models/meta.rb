class MetaRecord < ActiveRecord::Base
  self.abstract_class = true

  attr_accessible :metadata

  # A getter and setter for :metadata  
  # If a Ruby hash is provided, update :metadata
  # Otherwise return a Ruby hash of the current :metadata
  def meta(data)
    if data.nil?
      return JSON.parse(metadata)
    elsif not data.nil?
      metadata = data.to_json
    end
  end
end
