class PhotosController < ApplicationController
  def index
    @photos = Photo.where(true)

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @photos }
    end
  end

  def show 
    @photo = Photo.find(params[:id])
    respond_to do |format|
      format.json {render json: @photo}
    end
  end
end