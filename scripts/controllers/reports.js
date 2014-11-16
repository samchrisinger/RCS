app.controller('ReportsCtrl', ['$scope', '$rootScope', '$http', '$location', 'User', 'Report', 'ChemicalReport', 'BacteriaReport',
    function($scope, $rootScope, $http, $location,
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
		
	Report.prototype.get().then(function(reports){
	    $scope.reports = reports
	    $scope.markers = {};
	    reports.map(function(r){
		if(r.geometry){
		    $scope.markers[r.id] = {
			lat: r.lat,
			lng: r.lng
		    };
		}
	    });
	});
    }
]);
