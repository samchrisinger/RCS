app.controller('DataCtrl', ['$scope', '$rootScope', 'Observation',
    function($scope, $rootScope, Observation){
	// TODO showme
	$scope.hidden = true;

	$scope.min = Math.min;
	$scope.max = Math.max;
	$scope.floor = Math.floor;
	
	$scope.block = 0;
	$scope.observations = [];
	$scope.page = 1;

	$scope.getObservations = function(page){
	    if (page*20 > $scope.observations.length){
		Observation.query({page: page}, function(observations){		    
		    $scope.observations = observations;
		});			
	    }
	    $scope.page = page;
	};
	$scope.current_user = $rootScope.current_user;
	$scope.getObservations(1);
    }]
);

