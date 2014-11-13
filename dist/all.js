var app = angular.module('app',['ngResource', 
				'ngRoute', 
				'angularMoment',
				'leaflet-directive',
				'ui.bootstrap']);

;app.constant("settings", {
    CC: {
	app_id: 164,    
	api_base: 'http://api.commonscloud.org/v2'
    },
    ORG_NAME: 'RCS',
    SCHEMA: {
	"Report": {
	    id: 'type_dde15cc0a0e44059b4225810ef5cf001',
	    "Chemical Report": {
		id: 'type_e90f64c1fcae4433ba5fa42e555052d1'
	    },
	    "Bacteria Report": {
		id: 'type_9d7305d4174e4bfa978444065184eecd'
	    }
	}
    },
    URI: 'http://localhost:9000'
});
;app.factory('CommonsInterceptor', ['$rootScope', '$location', 'settings', function($rootScope, $location, settings){
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
		    .when('/', {
			templateUrl: 'templates/home.html'
		    });
		$httpProvider.interceptors.push('CommonsInterceptor');
		$httpProvider.defaults.useXDomain = true;
		delete $httpProvider.defaults.headers.common['X-Requested-With'];
	    }]);

app.run(['$rootScope', '$location', 'User', 'settings', function($rootScope, $location, User, settings){     
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
		 if (res.status === 403){
		     window.localStorage.removeItem(settings.ORG_NAME+'_auth');
		     window.location.href = "#sign_in";
		 }
	     }); 
}]);
;app.directive('date', function(){
    return {
	require: 'ngModel',
	restrict: 'A',
	scope: {},
	link: function(scope, el, attrs, ngModel){
	    if(!ngModel) return;
	    
	    ngModel.$formatters.push(function(modelValue){
		return modelValue.toLocaleString().split(' ')[0];
	    });
	    ngModel.$parsers.push(function(viewValue){
		var vals = viewValue.split('/');
		var today = new Date();
		var y = vals[2] || today.getFullYear();;
		var m = vals[0] || today.getMonth();
		var d = vals[1] || today.getDate();	
		var old = ngModel.$modelValue;
		old.setYear(y);
		old.setMonth(m);
		old.setDate(d);
		return old;
	    });
	    /*
	    ngModel.$render = function(){
		var d = new Date(ngModel.$modelValue);
		el.val(d.toLocaleString().split(' ')[0]);
	    };
	    */
	}
    };
});
;app.directive('time', function(){
    return {
	require: 'ngModel',
	restrict: 'A',
	scope: {},
	link: function(scope, el, attrs, ngModel){
	    if(!ngModel) return;
	    
	    ngModel.$formatters.push(function(modelValue){
		return modelValue.toTimeString().split(' ')[0].split(':').slice(0,2).join(':');
	    });
	    ngModel.$parsers.push(function(viewValue){
		var vals = viewValue.split(':');
		var today = new Date();
		var h = vals[0] || today.getHours();
		var m = vals[1] || today.getMinutes();
		var old = ngModel.$modelValue;
		old.setHours(h);
		old.setMinutes(m);
		return old;
	    });
	    /*
	    ngModel.$render = function(){
		var d = new Date(ngModel.$modelValue);
		el.val(d.toLocaleString().split(' ')[0]);
	    };
	    */
	}
    };
});
;app.filter('correctify', function() {
    return function(input) {
	return input.charAt(0).toUpperCase() + input.slice(1).split('_').join(' ');
    };
});
;app.filter('date', function(){
    return function(input){
	return d.toLocaleString.split(' ')[0];
    };
});
;//http://stackoverflow.com/questions/21644493/how-to-split-the-ng-repeat-data-with-three-columns-using-bootstrap
app.filter('partition', function() {
  var cache = {};
  var filter = function(arr, size) {
    if (!arr) { return; }
    var newArr = [];
    for (var i=0; i<arr.length; i+=size) {
      newArr.push(arr.slice(i, i+size));
    }
    var arrString = JSON.stringify(arr);
    var fromCache = cache[arrString+size];
    if (JSON.stringify(fromCache) === JSON.stringify(newArr)) {
      return fromCache;
    }
    cache[arrString+size] = newArr;
    return newArr;
  };
  return filter;
});
;app.factory('App', ['$http', 'settings',
    function($http, settings) {
        /////////
        function instantiateModel(info, beforeSave) {
            app.factory(info.name, ['$resource', '$http',
                function($resource, $http) {
                    var URL = 'http://api.commonscloud.org/v2/' + info.storage + '.json';
                    var res = $resource(URL);
                    var R = function() {
                        this.save = function(children) {
			    // deep copy
			    var data = JSON.parse(JSON.stringify(this));
			    data = beforeSave(data, children);
                            return $http.post(URL, data);
                        };
                    };
                    return R;
                }
            ]);
        }
	function processSchemaDef(key, schema, templates){	    
	    var def = schema[key];
	    var children = Object.keys(def);
	    var subset = templates.filter(function(t){
		return children.indexOf(t.name) != -1
	    });	
	    instantiateModel(def, function(_children, info, child_ids){
		// relationships
		for(var j = 0; j < _children.length; j++){
		    var child = _children[j];
		    data[child.storage] = child_ids[child.name];
		}
		// clean null data
		for (var key in data) {
                    if (data[key] === null || key.indexOf('_') == 0) {
                        delete data[key];
                    }
                }
		// correct geodata
		if (data.lat || data.lon) {
		    data.geometry = JSON.stringify({
                        geometries: [{
                            coordinates: [
                                parseFloat(data.lat),
                                parseFloat(data.lon)
                            ],
                            type: "Point"
                        }],
                        type: "GeometryCollection"
                    });
                    delete data.lat;
                    delete data.lon;
                }
	    }.bind({}, children));
	}
        function alignAndInstantiate(schema, templates) {
	    var keys = Object.keys(schema);
	    for (var i = 0; i < keys.length; i++){
		processSchemaDef(keys[i], schema, templates);
	    }
        }
        /////////
        var URL = settings.CC.api_base + '/applications/' + settings.CC.app_id;
        var A = function() {
            var attrs = {};

            this.info = function() {
                return $http.get(URL + '.json');
            };
            this.load = function(cb) {
                return $http.get(URL + '/templates.json').then(function(res) {
                    var schema = settings.SCHEMA;
                    var templs = res.data.response.templates;
		    // todo generalize
                    //alignAndInstantiate(schema, templs);		    
		    return templs;
                });
            };
        };

        return A;
    }
]);
;app.factory('User', ['$resource', function ($resource) {
    return $resource('//api.commonscloud.org/v2/user/me.json');
    /*$resource(
	       
               '/users/:id',
               null,
               {update: {method: 'PUT'}}
          );
    */
}]);
;app.factory('ChemicalReport', ['$resource', '$http',function ($resource, $http) {
    var URL = 'http://api.commonscloud.org/v2/type_e90f64c1fcae4433ba5fa42e555052d1.json';
    var res = $resource(URL);
    var CR = function(){};
    
    CR.prototype.save = function(){
	var data = JSON.parse(JSON.stringify(this));
	for(var key in data){
	    data[key] = data[key].value;
	    if(data[key] === null){
		delete data[key];
	    }
	}
	return $http.post(URL, data);
    };
    
    return CR;
}]);

;app.factory('BacteriaReport', ['$resource', '$http', function($resource, $http){
    var URL = 'http://api.commonscloud.org/v2/type_9d7305d4174e4bfa978444065184eecd.json';

    var res = $resource(URL);
    var CR = function(){};
    
    CR.prototype.save = function(){
	var data = JSON.parse(JSON.stringify(this));
	for(var key in data){
	    data[key] = data[key].value;
	    if(data[key] === null){
		delete data[key];
	    }
	}
	return $http.post(URL, data);
    };

    return CR;    
}]);
;app.factory('Report', ['$resource', '$http', 'settings', function ($resource, $http, settings) {
    var URL = 'http://api.commonscloud.org/v2/type_dde15cc0a0e44059b4225810ef5cf001.json';
    var res = $resource(URL);
    var R = function(){};
    
    R.prototype.save = function(ids){	
	var data = JSON.parse(JSON.stringify(this));	
	delete data.bacteria_report;
	delete data.chemical_report;
	//data[settings.SCHEMA['Report']['Bacteria Report'].id] = ids.bid;
	//data[settings.SCHEMA['Report']['Chemical Report'].id] = ids.cid;
	data['Bacteria Report'] = ids.bid;
	data['Chemical Report'] = ids.cid;
	for(var key in data){
	    if(data[key] === null || key.indexOf('_') == 0){
		delete data[key];
	    }
	}
	if(data.lat || data.lon){
	    data.geometry = JSON.stringify({
	      geometries: [
		    {
			coordinates: [
			    parseFloat(data.lat),
			    parseFloat(data.lon)
			],
			type: "Point"
		    }
		],
		type: "GeometryCollection"
	    });
	    delete data.lat;
	    delete data.lon;
	}

	return $http.post(URL, data);
    };
    
    return R;
}]);
;app.controller('UserCtrl', ['$scope', '$rootScope', '$routeParams', '$location', 'User',
    function($scope, $rootScope, $routeParams, $location, User){
	$scope.user = {};
	$rootScope.$watch('current_user', function(newval){
	    $scope.user = newval;
	});

	if (!$routeParams.length) { // new user
	    $scope.new_user = new User();
	    $scope.new_user.metadata = {phone:''};
	    $scope.register = function(){
		$scope.new_user.metadata.phone = $scope.new_user.metadata.phone.replace(/\D/g,'');
		$scope.new_user.$save(function(res){
		    if(res.message)
			alert("Sorry: "+res.message);
		    else{
			$scope.new_user.metadata = JSON.parse(res.metadata);
		    }
		});
	    };
	}	
    }]
);
;app.controller('ReportCtrl', ['$scope', '$rootScope', '$routeParams', '$http', '$location', 'User', 'Report', 'ChemicalReport', 'BacteriaReport',
    function($scope, $rootScope, $routeParams, $http, $location,
        User, Report, ChemicalReport, BacteriaReport) {

	// LEAFLET
	angular.extend($scope, {
	    center: {
		lat: 38.0279630,
		lng: -78.4592056,
		zoom: 12
	    },
	    defaults: {
		tileLayer: 'http://otile1.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg'
	    }
	});		

	// fix map interaction issues
	angular.element('map').eq(0).css('position', 'static')
	///////

        // new report
        if (Object.keys($routeParams).length == 0) {
	    // LEAFLET
	    $scope.markers = {
		main: {
		    lat: 38.0279630,
		    lng: -78.4592056,
                    draggable: true
                }
	    };
	    var markerMoved = function(){
		$scope.center.lat = $scope.markers.main.lat;
		$scope.center.lng = $scope.markers.main.lng;
	    };
	    $scope.$watch('markers.main.lng', markerMoved);
	    $scope.$watch('markers.main.lat', markerMoved);
	    ///////

            $scope.templates = ['guardian', 'steward'];
            $scope.template = 'guardian';

            $scope.report = new Report();	    
            var R = $scope.report;
            // defaults
            R._date = new Date();
            R.date = (new Date(R._date)).toLocaleDateString();
            R.time = (new Date(R._date)).toTimeString().split(' ')[0];
            R.updateTime = function() {
                R._date = new Date(R.date + ", " + R.time);
            };

            R.weather = '';
            R.recent_precipitation = '';
            R.lat = '';
            R.lon = '';
            R.notes = '';
            // Chemical
            R.chemical_report = new ChemicalReport();
            var CR = R.chemical_report;
            // defaults
            CR.description_of_testing_site = {
                label: 'Description of testing site',
                value: '',
                type: 'string'
            };
            CR['used_rcs_test_kit?'] = {
                label: 'Used RCS test kit?',
                type: 'bool',
                value: false
            };
            CR.water_temperature = {
                label: 'Water temperature',
                value: null,
                type: 'number'
            };
            CR.air_temperature = {
                label: 'Air temperature',
                value: null,
                type: 'number'
            };
            CR.dissolved_oxygen = {
                label: 'Dissolved oxygen',
                value: null,
                type: 'number'
            };
            CR.pH = {
                label: 'pH',
                value: null,
                type: 'number'
            };
            CR.turbidity = {
                label: 'Turbidity',
                value: null,
                type: 'number'
            };
            CR.river_flow = {
                label: 'River flow',
                value: '',
                type: 'string'
            };
            CR.water_color = {
                label: 'Water color',
                value: '',
                type: 'string'
            };
            CR.water_odor = {
                label: 'Water odor',
                value: '',
                type: 'string'
            };
            // Bacteria
            R.bacteria_report = new BacteriaReport();
            var BR = R.bacteria_report;
            // defaults
            BR.description_of_testing_site = {
                label: 'Description of testing site',
                value: '',
                type: 'string'
            };
            BR.water_temperature = {
                label: 'Water temperature',
                value: null,
                type: 'number'
            };
            BR.air_temperature = {
                label: 'Air temperature',
                value: null,
                type: 'number'
            };
            BR.water_color = {
                label: 'Water color',
                value: '',
                type: 'string'
            };
            BR.water_odor = {
                label: 'Water odor',
                value: '',
                type: 'string'
            };
            BR.colonies_river_left = {
                label: 'Colonies - river left',
                value: null,
                type: 'number'
            };
            BR.colonies_river_right = {
                label: 'Colonies - river right',
                value: null,
                type: 'number'
            };
            BR.river_flow = {
                label: 'River flow',
                value: null,
                type: 'number'
            };

            $scope.submit = function() {
		CR.save().then(function(cres){
		    var hasBR = false;
		    if($scope.template === 'guardian'){
			BR.save().then(function(bres){			    
			    R.save({
				cid: cres.data.resource_id,
				bid: bres.data.resource_id
			    });

			});
		    }
		    else{
			R.save({
			    cid: cres.data.resource_id,
			    bid: null
			}).then(function(res){
			    debugger;
			}, function(err){
			    debugger;
			});
		    }
		}, function(err){
		    debugger;
		});
            };
        }
        // view report
        else {
	    
        }
    }
]);
;app.controller('LoginCtrl', ['$scope', '$rootScope', 'settings',
			     function($scope, $rootScope,
				      settings) {
				 $scope.redirect_uri = encodeURIComponent(settings.URI);
				 
			     }]);
