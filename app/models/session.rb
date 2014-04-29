class Session < ActiveRecord::Base
  attr_accessible :token
  
  belongs_one :code
end
