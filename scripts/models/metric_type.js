app.factory('MetricType', ['$resource', function($resource){
    return $resource(
	'/metric_types/:id',
	null,
	{}
    );
}])
;
