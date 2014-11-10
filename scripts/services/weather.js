app.factory('Weather', ['$http', function($http){
    var w = {};
    var API = '/weather';
    var history_url = 'http://api.wunderground.com/api/653db1269fdb8569/conditions_';
    var locate_url = 'http://api.wunderground.com/api/653db1269fdb8569/geolookup/q/';

    var pad = function(num){
	return ('00'+num.toString()).slice(-2);
    };

    var locate = function(coords, cb){
	$http({
	    method: 'GET',
	    url: API,
	    params: {
		url: [locate_url+coords.lat,',',coords.lon,'.json'].join('')
	    }
	}).success(function(res){
	    var locationstring = _utils.mash(res.location, function(l){
		return l.state+'/'+l.city;
	    });
	    cb(locationstring);
	});
    };

    w.get = function(coords, date, cb){
	locate(coords, function(loc){
	    var ds = date.toLocaleDateString().split('/');
	    ds = ds.pop() + pad(ds.splice(0,1)) + pad(ds.pop());
	    $http({
		method: 'GET',
		url: API,
		params: {
		    url: [history_url, ds, '/q/', loc, '.json'].join('')
		}
	    }).success(function(res){
		cb(res.current_observation);
	    });
	});
    };
    return w;
}]);
