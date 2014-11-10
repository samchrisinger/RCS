app.controller('UserCtrl', ['$scope', '$rootScope', '$routeParams', '$location', 'User',
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
