app.controller('ObservationCtrl', ['$scope', '$rootScope', '$routeParams', 'Observation', 'Metric', 'MetricType', function($scope, $rootScope, $routeParams, Observation, Metric, MetricType){       
    $scope.current_user = $rootScope.current_user;
    $scope.observation = {};
    $scope.metric_types = [];
    MetricType.query(function(mts){
	$scope.metric_types = mts;
    });
    $rootScope.$broadcast('toggleMap', true);
    if(Object.keys($routeParams).length == 0){
	$scope.observation.add = function(){
	    if($scope.observation.metrics[0].value === '...')
		return;
	    $scope.observation.metrics.unshift({type: {name:'...'}, value: '...'});
	};
	$scope.observation.remove = function(index){
	    $scope.observation.metrics.splice(index, 1);		
	};
	//new Observation
	$scope.observation.metrics = [{type: {name:'...'}, value: '...'}];
	$scope.observation.lat = null;
	$scope.observation.lon = null;
	var d = new Date();	
	d.setMinutes(15*Math.round(d.getMinutes()/15));
	$scope.observation.timestamp = d;
	var m = new Date();
	m.setDate(m.getDate() - 7);	
	$scope.dp = {
	    opened: false,
	    maxDate: d,
	    minDate: m,
	    format: 'MM dd yyyy',
	    open: function($event) {
		$event.preventDefault();
		$event.stopPropagation();		
		$scope.dp.opened = true;
	    }
	};
    }
    else{
	//old Observation
	Observation.get(
	    {id:$routeParams.id,
	     with_metrics:true}, 
	    function(obs){
		$scope.observation = obs;
		$rootScope.$broadcast('mapChange', [{
		    lat: obs.lat,
		    lon: obs.lon
		}]);	
	    });
    }
}]);
