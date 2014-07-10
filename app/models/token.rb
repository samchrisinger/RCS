class Token < ActiveRecord::Base
  attr_accessible :token

  has_one :user

  def valid
    return true
  end
end
