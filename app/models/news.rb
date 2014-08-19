class News < ActiveRecord::Base
  attr_accessible :title, :body

  def self.for(level)
    if level == 2
        return News.where(:for=>(0..2))
    elsif level == 1
        return News.where(:for=>(0..1))
    elsif level == 0
        return New.where(:for=>0)
    end
  end
end
