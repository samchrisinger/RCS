class UsersController < ApplicationController
  skip_before_filter :ensure_auth, :only=>[:token_login]

  def ensure_admin 
    if not current_user.admin
      return 
    end    
  end
  
  # GET /users
  # GET /users.json
  def index
    @users = User.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @users }
    end
  end

  # GET /users/1
  # GET /users/1.json
  def show
    @user = User.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @user }
    end
  end

  # GET /users/new
  # GET /users/new.json
  def new
    @user = User.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @user }
    end
  end

  # GET /users/1/edit
  def edit
    @user = User.find(params[:id])
  end

  # POST /users
  # POST /users.json
  def create
    email = params[:email]
    if email.nil?
      return 422
    end
    if User.where(:email=>email).count() > 0
      return render json: {:message=>"A user with that email address already exists"}
    end

    attrs = {
      :first_name=>params[:first_name] || '',
      :last_name=>params[:last_name] || '',
      :email=>params[:email],
      :guardian=>params[:guardian] || false,
      :admin=>params[:admin] || false,
      :metadata=>{
        :phone=>params[:phone]
      }.to_json,
      :password=>SecureRandom.hex(8)
    }    
    @user = User.new(attrs)
    
    respond_to do |format|
      if @user.save
        format.html { redirect_to @user, notice: 'User was successfully created.' }
        format.json { render json: @user, status: :created, location: @user }
      else
        format.html { render action: "new" }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /users/1
  # PUT /users/1.json
  def update
    @user = User.find(params[:id])

    respond_to do |format|
      if @user.update_attributes(params[:user])
        format.html { redirect_to @user, notice: 'User was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    @user = User.find(params[:id])
    @user.destroy

    respond_to do |format|
      format.html { redirect_to users_url }
      format.json { head :no_content }
    end
  end

  # POST /users/login
  def token_login
    email = params[:email]
    password = params[:password]
    if email.nil? or password.nil?
      head :unauthorized
    else
      user = User.find_by_email(email)
      if user.nil?      
        head :unauthorized
      elsif user.valid_password?(password)        
        payload = {:type=>'permenant', :user_id=>user.id, :chunk=>user.encrypted_password[0..4], :expires=>Date.today+30}
        render :json=>{:token=>JWT.encode(payload, JWT_SECRET), :user=>user}
      else
        head :unauthorized
      end
    end
  end

  def code_login
    key = params[:code]
    if key.nil?
      head :unauthorized
    else
      code = Code.where(:value=>key)[0]
      if code.nil?
        render json:{:error=>'Bad code, please double check that you typed it correctly'}
        return
      else
        unless code.expired?
          payload = {:type=>'temporary', :authorizer=>code.user_id, :expires=>code.end_date}
        render :json=>{:token=>JWT.encode(payload, JWT_SECRET), :user=>user}
          return
        end
        render json: {:eeror=>'That code is expired'}
        return
      end
    end    
  end
end
