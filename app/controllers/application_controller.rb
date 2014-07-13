class ApplicationController < ActionController::Base
  before_filter :ensure_auth
  before_filter :set_access

  def set_access
    headers["Access-Control-Allow-Origin"] = '*'    
    headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, DELETE'
    headers['Access-Control-Allow-Headers'] = 'Origin, X-RequestedWith, Content-Type, Accept, Authorization'
    headers['Access-Control-Max-Age'] = '604800'
  end

  def ensure_auth
    auth = request.headers['HTTP_AUTHORIZATION']   
    if auth.nil?
      authenticate_user!
    else
      authenticate_user_with_jwt!
    end
  end
  
  def authenticate_user_with_jwt!    
    auth = request.headers['HTTP_AUTHORIZATION']      
    if auth.nil?        
      render json: {:error=>'No Auth token, please get one first'}, status: 400
      return
    end
    token = auth.split('JWT ').pop()
    payload = nil
    begin          
      payload = JWT.decode(token, JWT_SECRET)[0]     
    rescue
      render json: {:error=>'Bad token, please get a new one'}, status: 400
      return
    end
    type = payload['type']
    if type.nil?
      render json: {:error=>'Bad token, please get a new one'}, status: 400
      return
    end
    if type == 'temporary'
      if payload.nil? or payload['authorizer'].nil? or payload['expires'].nil?
        render json: {:error=>'Bad token, please get a new one'}, status: 400
        return        
      end
      # TODO finish me
    elsif type == 'permenant'
      if payload.nil? or payload['user_id'].nil? or payload['expires'].nil? or payload['chunk'].nil?
        render json: {:error=>'Bad token, please get a new one'}, status: 400
        return
      end    
      user_id = payload['user_id']
      user = User.find(user_id)
      if user.nil?
        render json: {:error=>'Unrecognized token, try getting a new one'}, status: 400
        return
      end
      chunk = payload['chunk']
      pass = user.encrypted_password
      if not pass[0..4] == chunk
        render json: {:error=>'Unrecognized token, try getting a new one'}, status: 400
        return
      end
      exp = Date.parse(payload['expires'])
      today = Date.current
      if exp < today
        render json: {:error=>'Your token is expired, please get a new one'}, status: 401
        return
      end
      @current_user = user
    end        
  end
end
  
