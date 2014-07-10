Warden::Strategies.add :jwt do
  def valid?
    logger.info "JWT"
    return render json: {:msg=>'hit'}
    auth = request.headers['HTTP_AUTHORIZATION']   
    if auth.nil?
      return false
    else
      return auth.split('JTW ') >= 1
    end
  end
  
  def authenticate!
    render json: {:msg=>'ok'}
    auth = request.headers['HTTP_AUTHORIZATION']      
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
      
    elsif type == 'permenant'
      if payload['user_id'].nil? or payload['expires'].nil? or payload['chunk'].nil?
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
        render json: {:error=>'Your token is expired, please get a new one'}, sttaus: 401
        return
      end      
      @current_user = user
      halt!
    end
  end      
end    
