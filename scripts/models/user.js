app.factory('User', ['$resource', function ($resource) {
    return $resource('//api.commonscloud.org/v2/user/me.json');
    /*$resource(
	       
               '/users/:id',
               null,
               {update: {method: 'PUT'}}
          );
    */
}]);
