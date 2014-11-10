class HomeController < ApplicationController
  skip_before_filter :ensure_auth, :only=>[:commons]

  def index

  end

  def commons
    render 'index.html.erb'
  end
end
