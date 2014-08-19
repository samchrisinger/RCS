var app = angular.module('rcsApp',['ngResource', 
				   'templates', 
				   'ngRoute', 
				   'angularMoment',
				   'ngMap',
				   'ui.bootstrap']);

app.config(['$routeProvider', 
	    function($routeProvider){
		$routeProvider
		    .when('/observations/new', {
			controller: 'ObservationCtrl',
			templateUrl: 'new_observation.html'
		    })
		    .when('/observations/:id', {
			controller: 'ObservationCtrl',
			templateUrl: 'observation.html'		    })
		    .when('/profile/:id',{
			controller: 'ProfileCtrl',
			templateUrl: 'profile.html'
		    })
		    .when('/photos/:id', {
			controller: 'PhotoCtrl',
			templateUrl: 'photo.html'
		    })
		    .when('/', {
			controller: 'HomeCtrl',
			templateUrl: 'home.html'
		    });
	    }]
);

app.run(function($rootScope){
    $rootScope.current_user = current_user;
    $rootScope.$on('$locationChangeStart', function(evt){
	$rootScope.$broadcast('toggleMap', false);
    });
});
