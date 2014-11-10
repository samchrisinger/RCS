app.factory('CommonsInterceptor', ['$rootScope', '$location', 'settings', function($rootScope, $location, settings){
    return {
	request: function(config){
	    config.userXDomain = true;
	    config.headers['Cache-Control'] = 'no-cache, max-age=0, must-revalidate';
	    config.headers['Authorization'] = window.localStorage.getItem(settings.ORG_NAME+'_auth');
	    for(var key in config.data){
		if (config.data[key] === ""){
		    config.data[key] = null;
		}
	    }	    
	    return config;
	}
    };
}]);

app.config(['$routeProvider', '$httpProvider', '$locationProvider',
	    function($routeProvider, $httpProvider, $locationProvider){
		$routeProvider
		    .when('/observations/new', {
			controller: 'ObservationCtrl',
			templateUrl: 'new_observation.html'
		    })
		    .when('/observations/:id', {
			controller: 'ObservationCtrl',
			templateUrl: 'observation.html'		    
		    })
		    .when('/user/new', { 
			controller: 'UserCtrl',
			templateUrl: 'new_user.html'
		    })		
		    .when('/user/:id',{
			controller: 'ProfileCtrl',
			templateUrl: 'user.html'
		    })
		    .when('/photos/:id', {
			controller: 'PhotoCtrl',
			templateUrl: 'photo.html'
		    })
		    .when('/report/new', {
			controller: 'ReportCtrl',
			templateUrl: 'new_report.html'		    
		    })
		    .when('/report/:id', {
			controller: 'ReportCtrl',
			templateUrl: 'view_report.html'		    
		    })
		    .when('/', {
			controller: 'HomeCtrl',
			templateUrl: 'home.html'
		    });
		$httpProvider.interceptors.push('CommonsInterceptor');
		$httpProvider.defaults.useXDomain = true;
		delete $httpProvider.defaults.headers.common['X-Requested-With'];
	    }]);

app.run(['$rootScope', '$location', 'App', 'User', 'settings', function($rootScope, $location, App, User, settings){     
    if(window.localStorage.getItem(settings.ORG_NAME+'_auth') == null){
	function getHash(url){
	    var tuples = url
		.replace('/', '')
		.split('&')
		.map(function(param){
		    return param.split('=');
		});
	    var ret = {};
	    tuples.map(function(tuple){
		ret[tuple[0]] = tuple[1];
	    });
	    return ret;
	};
	var hash = getHash($location.url());
	window.localStorage.setItem(settings.ORG_NAME+'_auth', hash.token_type+' '+hash.access_token);
	$location.path('');
    }

    $rootScope.current_user = {};
    User.get({},
	     function(res){
		 $rootScope.current_user = res.response;
	     },
	     function(res){
		 if (res.status === 403){
		     window.localStorage.removeItem(settings.ORG_NAME+'_auth');
		     window.location.href = "users/sign_in";
		 }
	     }); 
    var app = new App();
    app.load(function(info){	
	$rootScope.appInfo = info;
    });
}]);
