class ObservationsController < ApplicationController
  # GET /observations
  # GET /observations.json
  def index
    @observations = Observation.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @observations }
    end
  end

  # GET /observations/1
  # GET /observations/1.json
  def show
    @observation = Observation.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @observation }
    end
  end

  # GET /observations/new
  # GET /observations/new.json
  def new
    @observation = Observation.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @observation }
    end
  end

  # GET /observations/1/edit
  def edit
    @observation = Observation.find(params[:id])
  end

  # POST /observations
  # POST /observations.json
  def create        
    data = {
      :lat=>params[:lat],
      :lon=>params[:lon],
      :timestamp=>params[:fimestamp],
      :participants=>params[:participants],
      :guardian=>@current_user.guardian,
      :rcs_test_kit_use=>params[:rcs_test_kit_use],
      :photo=>params[:photo],
      :comment=>params[:comment],
      :metadata=>params[:metadata]
    }

    @observation = Observation.new(data)
    @observation.user_id = @current_user.id
    saved = @observation.save
    if saved        
      metrics = params[:metrics]
      unless metrics.nil?
        metrics.each do |metric|
          data = {
            :metric_type_id=>metric[:metric_type_id],
            :value=>metric[:value]
          }
          @metric = Metric.new(data)
          @metric.observation_id = @observation.id
          if !@metric.save
            logger.info metric+" failed to save"
          end
        end
      end
    end

    respond_to do |format|
      if saved 
        format.html { redirect_to @observation, notice: 'Observation was successfully created.' }
        format.json { render json: @observation, status: :created, location: @observation }
      else
        format.html { render action: 'new' }
        format.json { render json: @observation.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /observations/1
  # PUT /observations/1.json
  def update
    @observation = Observation.find(params[:id])

    respond_to do |format|
      if @observation.update_attributes(params[:observation])
        format.html { redirect_to @observation, notice: 'Observation was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @observation.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /observations/1
  # DELETE /observations/1.json
  def destroy
    @observation = Observation.find(params[:id])
    @observation.destroy

    respond_to do |format|
      format.html { redirect_to observations_url }
      format.json { head :no_content }
    end
  end
end
