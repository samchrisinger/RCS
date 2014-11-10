app.factory('Photo', ['$resource', function ($resource) {
    return $resource(
        '/photos/:id',
        null
    );
}]);
