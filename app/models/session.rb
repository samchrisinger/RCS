class Session < ActiveRecord::Base
  attr_accessible :token
  
  belongs_to :code

  def expired?
    not code.valid?
  end
end
