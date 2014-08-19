app.controller('mapCtrl', function($scope){    
    $scope.center = [38.01185325927953,-78.42521667480469];
    $scope.zoom = 12;   
    $scope.visible = false;
    $scope._markers = [];
    var clearMarkers = function(){
    	for(var i=0; i<$scope._markers.length; i++){
	    $scope._markers[i].setMap(null);
	}	
    };
    $scope.setMarkers = function(coords){
	clearMarkers();
	var latlng;
	for(var i=0; i<coords.length; i++){
	    var coord = coords[i];
	    latlng = new google.maps.LatLng(coord.lat, coord.lon);
	    var marker = new google.maps.Marker({
		position: latlng,
		map: $scope.map
	    });
	    $scope._markers.push(marker);
	}
	$scope.map.setCenter(latlng);
	google.maps.event.trigger($scope.map, 'resize');	
    };
    $scope.$on('mapChange', function(evt, data){
	$scope.setMarkers(data);
    });
    $scope.$on('toggleMap', function(evt, data){
	$scope.visible = data;
	if(data)
	    window.setTimeout(function(){
		google.maps.event.trigger($scope.map, 'resize');	
	    }, 100);
	if(!data){
	    clearMarkers();
	}
    });    
});
