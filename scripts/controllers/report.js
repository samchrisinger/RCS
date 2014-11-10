app.controller('ReportCtrl', ['$scope', '$rootScope', '$routeParams', '$http', '$location', 'Types', 'User', 'Report', 'ChemicalReport', 'BacteriaReport',
    function($scope, $rootScope, $routeParams, $http, $location,
        Types, User, Report, ChemicalReport, BacteriaReport) {

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
