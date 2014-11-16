app.controller('ReportCtrl', ['$scope', '$rootScope', '$routeParams', '$http', '$location', 'User', 'Report', 'ChemicalReport', 'BacteriaReport',
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
	    $scope.cr_keys = Object.keys(CR);
            // Bacteria
            R.bacteria_report = new BacteriaReport();
            var BR = R.bacteria_report;
	    $scope.br_keys = Object.keys(BR);
	    $scope.has_bacteria = true;

            $scope.submit = function() {		
		CR.save().then(function(cres){
		    var hasBR = false;
		    if($scope.template === 'guardian' && $scope.has_bacteria){
			BR.save().then(function(bres){			    
			    R.save({
				cid: cres.data.resource_id,
				bid: bres.data.resource_id
			    }).then(function(res){
				$rootScope.messages.push({
				    type: 'success',
				    msg: 'Your report was saved successfully'
				});
				$location.path('/report/'+res.data.resource_id);
			    });
			});
		    }
		    else{
			R.save({
			    cid: cres.data.resource_id,
			    bid: null
			}).then(function(res){
			    $rootScope.messages.push({
				type: 'success',
				msg: 'Your report was saved successfully'
			    });			    
			    $location.path('/report/'+res.data.resource_id);
			});
		    }
		}, function(err){
		    console.log(error);
		});
            };
        }
        // view report
        else {
	    var id = $routeParams.id;
	    $scope.report = {};
	    Report.prototype.getOne(id).then(function(report){
		$scope.report = report;
		if(report.geometry){
		    //configure map
		}		
	    });
	    
	    $scope.submit = function(){
		$scope.report.update().then(function(){
		    $rootScope.messages.push({
			type: 'success',
			msg: 'Your report was saved successfully'
		    });			    		    
		});
	    };
        }
    }
]);
