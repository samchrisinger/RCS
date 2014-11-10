app.controller('ObservationCtrl', ['$scope', '$rootScope', '$routeParams', 'Observation', 'Metric', 'MetricType', 'Weather', function($scope, $rootScope, $routeParams, Observation, Metric, MetricType, Weather){    
    // TODO deleteme
    $scope.STF = JSON.stringify;
    ////
    $scope.current_user = $rootScope.current_user;    
    $scope.observation = {observer: current_user, metrics: {}};
    $scope.metric_types = [];    
    MetricType.query(function(mts){
	$scope.metric_types = mts;
	mts.filter(function(mt){
	    $scope.observation.metrics[mt.id] = {id: mt.id, 
						 value: null};
	});
    });
    $scope.getMetric = function(name){
	var found = $scope.metric_types.filter(function(mt){
	    return mt.name == name;
	});
	return found[0].id;
    };
    $rootScope.$broadcast('toggleMap', true);
    if(Object.keys($routeParams).length == 0){       
	$scope.template = 'steward';
	// TODO restrict by user type
	$scope.templates = ['guardian', 'steward']; 
	$scope.observation.metadata = {
	    observers: [(current_user.first_name+' '+current_user.last_name)],
	    bacteria: [
		{
		    type: 'water_temperature',
		    value: null,
		    label: 'Water temperature (C)'
		},
		{
		    type: 'air_temperature',
		    value: null,
		    label: 'Air temperature (C)'
		},
		{
		    type: 'water_color',
		    value: null,
		    label: 'Water color'
		},
		{
		    type: 'water_odor',
		    value: null,
		    label: 'Water odor'
		},
		{
		    type: 'river_right',
		    value: null,
		    label: 'River right'			
		},
		{
		    type: 'right_colony_count',
		    value: null,
		    label: '# of colonies/100ml'			
		},
		{
		    type: 'river_left',
		    value: null,
		    label: 'River left'			
		},
		{
		    type: 'left_colony_count',
		    value: null,
		    label: '# of colonies/100ml'			
		},
		{
		    type: 'river_flow',
		    value: null,
		    label: 'River flow'			
		},
		{
		    type: 'river_flow_cubic_feet_per_second',
		    value: null,
		    label: 'Cubic Feet per second'
		}		
	    ]	
	};
	$scope.observation.addMetric = function(){
	    if($scope.observation.metrics[0].value === '...')
		return;
	    $scope.observation.metrics.unshift({type: {name:'...'}, value: '...'});
	};
	$scope.observation.removeMetric = function(index){
	    $scope.observation.metrics.splice(index, 1);		
	};
	//new Observation
	$scope.observation.metrics = [{type: {name:'...'}, value: '...'}];
	$scope.observation.lat = null;
	$scope.observation.lon = null;
	$scope.observation.updateCoordinates = function(){
	    $rootScope.$broadcast('mapChange', [
		{lat: $scope.observation.lat, 
		 lon: $scope.observation.lon}
	    ]);
	};
	$rootScope.$broadcast('locate', function(coords){
	    $scope.observation.lat = coords.lat;
	    $scope.observation.lon = coords.lng;
	    $scope.$apply();
	});	
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
	$scope.observation.getWeather = function(e){
	    var el = $(e.target);
	    var okBtn = {
		label: 'OK',
		className: 'btn-success',
		callback: function(){
		    Weather.get({
			lat: $scope.observation.lat,
			lon: $scope.observation.lon
		    },
				$scope.observation.timestamp, 
				function(weather){
				    $scope.observation.metadata;
				}
			       );
		}
	    };
	    var backBtn = {
		label: 'Go back',
		callback: function(){

		}
	    };
	    var buttons;
	    var msg = "<p>This feature uses a third party service to lookup accurate historical weather data. Before using it please:</p><ul>"; 
	    if(!$scope.observation.lat || !$scope.observation.lon){
		msg += "<li>use the map to the right to select your observation site</li></ul>";
		buttons = {back: backBtn};
	    }	
	    else{
		msg += ['<li>make sure the location set by the marker on the map to the right is accurate</li>', '<li>make sure the date and time set above are correct</li>', '</ul>'].join('');
		buttons = {back: backBtn, success: okBtn};
	    }
	    bootbox.dialog({
		message: msg,
		buttons: buttons
	    });
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
