class ApplicationController < ActionController::Base
  #protect_from_forgery
  before_filter :has_jwt

  def has_jwt
    unless user_signed_in?      
      token = request.header[:rcs_jwt]
      if token.nil?
        head :unauthorized
      else # if has token
        payload = JWT.decode(token, API_Keys::JWT_SECRET)
        if payload[:user_id].nil? or payload[:expires].nil? or payload[:chunk].nil?
          head :unauthorized
        else # if all params present
          user_id = payload[:user_id]
          user = User.find(user_id)
          if user.nil?
            head :unauthorized
          else # if user exists
            chunk = payload[:chunk]
            pass = user.encrypted_password
            if not pass[0..4] == chunk
              head :unauthorized
            else # if password subsequence matches
              exp = payload[:expires]
              today = Date.current
              if exp > today
                head :unauthorized
              end
            end          
          end
        end
      end
    end
  end
end
