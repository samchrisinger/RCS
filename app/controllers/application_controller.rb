class ApplicationController < ActionController::Base
  #protect_from_forgery
  before_filter :has_jwt

  def has_jwt
    unless user_signed_in?      
      auth = request.headers['HTTP_AUTHORIZATION']      
      if auth.nil?        
        render json: {:error=>'No Auth token, please get one first'}, status: 400
        return
      else # if has token
        token = auth.split('JWT ').pop()
        payload = nil
        begin          
          payload = JWT.decode(token, API_Keys::JWT_SECRET)[0]     
        rescue
          render json: {:error=>'Bad token, please get a new one'}, status: 400
          return
        end
        if payload.nil? or payload['user_id'].nil? or payload['expires'].nil? or payload['chunk'].nil?
          render json: {:error=>'Bad token, please get a new one'}, status: 400
          return
        else # if all params present
          user_id = payload['user_id']
          user = User.find(user_id)
          if user.nil?
            render json: {:error=>'Unrecognized token, try getting a new one'}, status: 400
            return
          else # if user exists
            chunk = payload['chunk']
            pass = user.encrypted_password
            if not pass[0..4] == chunk
              render json: {:error=>'Unrecognized token, try getting a new one'}, status: 400
              return
            else # if password subsequence matches
              exp = Date.parse(payload['expires'])
              today = Date.current
              if exp < today
                render json: {:error=>'Your token is expired, please get a new one'}, sttaus: 401
                return
              else
                @current_user = user
              end
            end          
          end
        end
      end
    end
  end
end
