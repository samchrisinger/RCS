app.controller('PhotoCtrl', ['$scope', '$rootScope', '$routeParams', 'Photo', function($scope, $rootScope, $routeParams, Photo){       
    $scope.current_user = $rootScope.current_user;
    $rootScope.$broadcast('toggleMap', true);
    $scope.photo = {};
    Photo.get({id:$routeParams.id},
	      function(photo){
		  $scope.photo = photo;
		  if(photo.lat){
		     $rootScope.$broadcast('mapChange', 
					   [{lat: photo.lat,
					     lon: photo.lon}]
					  );
		  }
	      });    
}]);
