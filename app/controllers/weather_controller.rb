require 'uri'
require 'net/http'

class WeatherController < ApplicationController
  skip_before_filter :ensure_auth, :only=>[:proxy]
  
  def proxy    
    url = params[:url]
    uri = URI.parse(url)

    http = Net::HTTP.new(uri.host, uri.port)
    res = http.request(Net::HTTP::Get.new(uri.request_uri))    
    respond_to do |format|      
      format.html #
      format.json {render json: res.body}
    end
  end
end
