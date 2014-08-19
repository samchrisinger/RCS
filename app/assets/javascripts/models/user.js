app.factory('User', ['$resource', function ($resource) {
           return $resource(
               '/users/:id',
               null,
               {update: {method: 'PUT'}}
          );
}]);
