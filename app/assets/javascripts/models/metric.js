app.factory('Metric', ['$resource', function($resource){
    return $resource(
	'/metrics/:id',
	null,
	{'get': {isArray: true}}
    );
}]);
