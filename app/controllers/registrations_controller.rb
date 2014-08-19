class RegistrationsController < Devise::RegistrationsController
  def new
    debugger
  end

  def create
    debugger;
    email = params[:email]
    if email.nil?
      return 422
    end
    if User.where(:email=>email).count()
      render json: {:message=>"A user with that email address already exists"}
    end

    params = {
      :first_name=>params[:first_name] or '',
      :last_name=>params[:last_name] or '',
      :email=>params[:email],
      :guardian=>params[:guardian] or false,
      :admin=>params[:admin] or false
      :metadata=>{
        :phone=>params[:phone]
      }
    }
    u = User.new(params)
    u.save
  end

  def update
    super
  end
end 
