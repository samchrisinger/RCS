class ApplicationController < ActionController::Base
  protect_from_forgery
  before_filter :has_token

  def has_token
    unless user_signed_in?      
      session = request.params['session']
      if session.nil?
        authenticate_user!
      elsif session.temporary
        s = Session.where(:token=>session.token)[0]
        if s.nil? or s.expired?
          head :unauthorized 
        end
      elsif not session.temporary
        u = User.where(:token=>session.token)[0]
        if u.nil?
          head :unauthorized
        end
      end
    end
  end
end
