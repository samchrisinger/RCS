class MetricTypesController < ApplicationController
  # GET /metric_types
  # GET /metric_types.json
  def index
    @metric_types = MetricType.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @metric_types }
    end
  end

  # GET /metric_types/1
  # GET /metric_types/1.json
  def show
    @metric_type = MetricType.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @metric_type }
    end
  end

  # GET /metric_types/new
  # GET /metric_types/new.json
  def new
    @metric_type = MetricType.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @metric_type }
    end
  end

  # GET /metric_types/1/edit
  def edit
    @metric_type = MetricType.find(params[:id])
  end

  # POST /metric_types
  # POST /metric_types.json
  def create
    @metric_type = MetricType.new(params[:metric_type])

    respond_to do |format|
      if @metric_type.save
        format.html { redirect_to @metric_type, notice: 'Metric type was successfully created.' }
        format.json { render json: @metric_type, status: :created, location: @metric_type }
      else
        format.html { render action: "new" }
        format.json { render json: @metric_type.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /metric_types/1
  # PUT /metric_types/1.json
  def update
    @metric_type = MetricType.find(params[:id])

    respond_to do |format|
      if @metric_type.update_attributes(params[:metric_type])
        format.html { redirect_to @metric_type, notice: 'Metric type was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @metric_type.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /metric_types/1
  # DELETE /metric_types/1.json
  def destroy
    @metric_type = MetricType.find(params[:id])
    @metric_type.destroy

    respond_to do |format|
      format.html { redirect_to metric_types_url }
      format.json { head :no_content }
    end
  end
end
