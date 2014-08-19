app.factory('Observation', ['$resource', function($resource){
    return $resource(
	'/observations/:id',
	null,
	{update: {method: 'PUT'}}
    );
}]);
