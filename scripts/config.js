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
		    .when('/reports', {
			controller: 'ReportsCtrl',
			templateUrl: 'templates/view_reports.html'
		    })
		    .when('/report/new', {
			controller: 'ReportCtrl',
			templateUrl: 'templates/new_report.html'		    
		    })
		    .when('/report/:id', {
			controller: 'ReportCtrl',
			templateUrl: 'templates/view_report.html'		    
		    })
		    .when('/sign_in', {
			controller: 'LoginCtrl',
			templateUrl: 'templates/login.html'
		    })
		    .when('/home', {
			templateUrl: 'templates/home.html'
		    })
		    .when('/', {
			templateUrl: 'templates/home.html'
		    });
		$httpProvider.interceptors.push('CommonsInterceptor');
		$httpProvider.defaults.useXDomain = true;
		delete $httpProvider.defaults.headers.common['X-Requested-With'];
	    }]);

app.run(['$rootScope', '$location', '$timeout', 'User', 'settings', 'tips', function($rootScope, $location, $timeout, User, settings, tips){     
    // bind tooltips, maybe a better way?
    $rootScope.tips = tips;

    $rootScope.isActive = function(path){
	return $location.path() === path;
    }

    $rootScope.messages = [];
    $rootScope.closeMsg = function(index){
	$rootScope.messages.splice(index, 1);
    };
    /*
    $rootScope.$watch('messages', function(oldval, newval){
	var count = oldval.length = newval.length;
	$timeout(function(){
	    $rootScope.messages  = $rootScope.messages.slice(0, count);
	}, 3000);
    });
    */
    

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
		 $rootScope.user = res.response;
	     },
	     function(res){
		 if (res.status === 403 || res.status === 0){
		     window.localStorage.removeItem(settings.ORG_NAME+'_auth');
		     window.location.href = "#sign_in";
		 }
	     }); 
}]);
