class ReportType < ActiveRecord::Base
  attr_accessible :name, :description

  # can_create(user):
  # if :auth_required == 2:
  #     return user.admin or user.guardian
  # elsif :auth_required == 1:
  #     return user.id != -1
  # elsif :auth_required == 0:
  #     return true 
  #
end
