app.controller('LoginCtrl', ['$scope', '$rootScope', 'settings',
			     function($scope, $rootScope,
				      settings) {
				 $scope.redirect_uri = encodeURIComponent(settings.URI);
				 
			     }]);
