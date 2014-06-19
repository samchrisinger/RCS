waterData
=========

## Routes

```
       new_user_session GET    /users/sign_in(.:format)          devise/sessions#new
            user_session POST   /users/sign_in(.:format)          devise/sessions#create
    destroy_user_session DELETE /users/sign_out(.:format)         devise/sessions#destroy
           user_password POST   /users/password(.:format)         devise/passwords#create
       new_user_password GET    /users/password/new(.:format)     devise/passwords#new
      edit_user_password GET    /users/password/edit(.:format)    devise/passwords#edit
                         PUT    /users/password(.:format)         devise/passwords#update
cancel_user_registration GET    /users/cancel(.:format)           devise/registrations#cancel
       user_registration POST   /users(.:format)                  devise/registrations#create
   new_user_registration GET    /users/sign_up(.:format)          devise/registrations#new
  edit_user_registration GET    /users/edit(.:format)             devise/registrations#edit
                         PUT    /users(.:format)                  devise/registrations#update
                         DELETE /users(.:format)                  devise/registrations#destroy
       user_confirmation POST   /users/confirmation(.:format)     devise/confirmations#create
   new_user_confirmation GET    /users/confirmation/new(.:format) devise/confirmations#new
                         GET    /users/confirmation(.:format)     devise/confirmations#show
                   users GET    /users(.:format)                  users#index {:format=>"json"}
                         POST   /users(.:format)                  users#create {:format=>"json"}
                new_user GET    /users/new(.:format)              users#new {:format=>"json"}
               edit_user GET    /users/:id/edit(.:format)         users#edit {:format=>"json"}
                    user GET    /users/:id(.:format)              users#show {:format=>"json"}
                         PUT    /users/:id(.:format)              users#update {:format=>"json"}
                         DELETE /users/:id(.:format)              users#destroy {:format=>"json"}
                 reports GET    /reports(.:format)                reports#index {:format=>"json"}
                         POST   /reports(.:format)                reports#create {:format=>"json"}
              new_report GET    /reports/new(.:format)            reports#new {:format=>"json"}
             edit_report GET    /reports/:id/edit(.:format)       reports#edit {:format=>"json"}
                  report GET    /reports/:id(.:format)            reports#show {:format=>"json"}
                         PUT    /reports/:id(.:format)            reports#update {:format=>"json"}
                         DELETE /reports/:id(.:format)            reports#destroy {:format=>"json"}
              news_index GET    /news(.:format)                   news#index {:format=>"json"}
                         POST   /news(.:format)                   news#create {:format=>"json"}
                new_news GET    /news/new(.:format)               news#new {:format=>"json"}
               edit_news GET    /news/:id/edit(.:format)          news#edit {:format=>"json"}
                    news GET    /news/:id(.:format)               news#show {:format=>"json"}
                         PUT    /news/:id(.:format)               news#update {:format=>"json"}
                         DELETE /news/:id(.:format)               news#destroy {:format=>"json"}
            observations GET    /observations(.:format)           observations#index {:format=>"json"}
                         POST   /observations(.:format)           observations#create {:format=>"json"}
         new_observation GET    /observations/new(.:format)       observations#new {:format=>"json"}
        edit_observation GET    /observations/:id/edit(.:format)  observations#edit {:format=>"json"}
             observation GET    /observations/:id(.:format)       observations#show {:format=>"json"}
                         PUT    /observations/:id(.:format)       observations#update {:format=>"json"}
                         DELETE /observations/:id(.:format)       observations#destroy {:format=>"json"}
    mobile_users_sign_in POST   /mobile/users/sign_in(.:format)   users#mobile_login
                    root        /                                 home#index
```
# API

## Token based-auth

By POSTing an email and password to /mobile/users/sign_in you get a JSON response containing a JWT token. This token is then be added to the Authorization header of HTTP requests sent to the server and is used to determine user identity. Try getting a token with:

```
curl --data "email=shc7pw@virginia.edu&password=12345" localhost:3000/mobile/users/sign_in
> {"token":"eyJ0eXAiOiJKV1QiLCJhbGciOadadi1NiJ9dW5rIjoiJDJhJDEiLCJleHBpcmVzIjoiMjAxNC0wNy0xNiJ9.QeASp4BN6yuAzFEosl1LaWTYYyaVY2CHWETKyxtcJAQ"}
```

And get some data with: 

```
curl -H 'Authorization: JWT eyJ0eXAiOiJKV1QiLCJhbGciOadadi1NiJ9dW5rIjoiJDJhJDEiLCJleHBpcmVzIjoiMjAxNC0wNy0xNiJ9.QeASp4BN6yuAzFEosl1LaWTYYyaVY2CHWETKyxtcJAQ' http://localhost:3000/observations
> [{"comment":"Testing this comment.Testing this comment.Testing this comment.Testing this comment.Testing this comment.Testing this comment.","created_at":"2014-04-29T23:54:42Z","guardian":true,"id":1,"lat":8.28834,"lon":35.5464,"metadata":null,"participants":1,"photo":"http://lorempixel.com/400/200/","rcs_test_kit_use":true,"timestamp":"2014-04-30T14:41:46Z","updated_at":"2014-04-29T23:54:42Z","user_id":41},{"comment":null,"created_at":"2014-04-29T23:55:22Z","guardian":true,"id":2,"lat":7.37095,"lon":-97.0159,"metadata":null,"participants":1,"photo":"http://lorempixel.com/400/200/","rcs_test_kit_use":true,"timestamp":"2014-04-30T14:41:46Z","updated_at":"2014-04-29T23:55:22Z","user_id":1},{"comment":null,"created_at":"2014-04-29T23:56:13Z","guardian":true,"id":3,"lat":-22.1038,"lon":-19.4191,"metadata":null,"participants":2,"photo":"http://lorempixel.com/400/200/","rcs_test_kit_use":true,"timestamp":"2014-04-30T14:41:46Z","updated_at":"2014-04-29T23:56:13Z","user_id":60},...]
```

## Adding observations

First you'll need to fetch the current list of available metric_types. These are subject to change and should not be cached. This list can be fetched like:

```
curl http://localhost:3000/metric_types
```

Now you can POST to /observations, remembering to set you Authorization header with your API token.

You JSON payload should look something like:

```
{
    "lat": float,
    "lon": float,
    "timestamp": timestamp,
    "participants": int,
    "rcs_test_kit_use": bool,
    "photo": string,
    "comment": text,
    "metadata": text,
    "metrics": [
        {
            "metric_type_id": int foreignkey,
            "value": float
        }
    ]
}
```

where metrics is an array of N metrics.

__For now photo uploads are unsupported, but are coming soon__