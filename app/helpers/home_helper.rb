module HomeHelper
  def nav_bar
    options = [{
                 :link=>'Home',
                 :href=>'/#'
               },
               {
                 :link=>'View Data',
                 :href=>'/#obseravtions'
               },
               {
                 :link=>'Add Data',
                 :href=>'/#observations/new'
               }
              ]
    if current_user.admin?
      options.concat([
                      {
                        :link=>'Administration', 
                        :children=>[
                                    {
                                      :link=>'Add Users',
                                      :href=>'/#user/new'
                                    }
                                   ]
                      },
                     ])
    end
    render :template=>"partials/navbar", :locals=>{:options=>options}
  end
end
