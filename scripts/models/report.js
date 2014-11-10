app.factory('Report', ['$resource', '$http', 'settings', function ($resource, $http, settings) {
    var URL = 'http://api.commonscloud.org/v2/type_dde15cc0a0e44059b4225810ef5cf001.json';
    var res = $resource(URL);
    var R = function(){};
    
    R.prototype.save = function(ids){	
	var data = JSON.parse(JSON.stringify(this));	
	delete data.bacteria_report;
	delete data.chemical_report;
	//data[settings.SCHEMA['Report']['Bacteria Report'].id] = ids.bid;
	//data[settings.SCHEMA['Report']['Chemical Report'].id] = ids.cid;
	data['Bacteria Report'] = ids.bid;
	data['Chemical Report'] = ids.cid;
	for(var key in data){
	    if(data[key] === null || key.indexOf('_') == 0){
		delete data[key];
	    }
	}
	if(data.lat || data.lon){
	    data.geometry = JSON.stringify({
	      geometries: [
		    {
			coordinates: [
			    parseFloat(data.lat),
			    parseFloat(data.lon)
			],
			type: "Point"
		    }
		],
		type: "GeometryCollection"
	    });
	    delete data.lat;
	    delete data.lon;
	}

	return $http.post(URL, data);
    };
    
    return R;
}]);
