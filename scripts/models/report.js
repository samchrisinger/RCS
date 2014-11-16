app.factory('Report', ['$resource', '$http', 'settings', 'Types', 'ChemicalReport', 'BacteriaReport', function ($resource, $http, settings, Types, ChemicalReport, BacteriaReport) {
    var URL = settings.CC.api_base + '/' + settings.SCHEMA.Report.id;
    var res = $resource(URL);
    var R = function(data){
	angular.extend(this, data);
    };

    var br_id = settings.SCHEMA['Report']['Bacteria Report'].id;
    var cr_id = settings.SCHEMA['Report']['Chemical Report'].id;

    var serialize = function(ids){
	var data = JSON.parse(JSON.stringify(this));	
	delete data.bacteria_report;
	delete data.chemical_report;
	if(ids){
	    data[br_id] = [{"id":ids.bid}];
	    data[cr_id] = [{"id":ids.cid}];
	}
	for(var key in data){
	    if(data[key] === null || key.indexOf('_') == 0 || data[key] === ""){
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
	return data;
    };

    
    R.prototype.save = function(ids){	
	var data = serialize.call(this, ids);
	return $http.post(URL+'.json', data);
    };
       
    R.prototype.get = function(){
	return $http.get(URL+'.json');
    };

    R.prototype.getOne = function(id){
	return $http.get([URL, '/', id, '.json'].join('')).then(function(res){
	    var data = res.data.response;
	    var ret = new R(data);
	    ret.chemical_report = {};
	    ChemicalReport.prototype.getOne(data[cr_id][0].id).then(function(cr){
		ret.chemical_report = new ChemicalReport(cr);
	    });
	    ret.bacteria_report = null;
	    if(data[br_id].length > 0){
		BacteriaReport.prototype.getOne(data[br_id][0].id).then(function(br){
		    ret.bacteria_report = new BacteriaReport(br);
		});
	    }
	    return ret;
	});
    };

    R.prototype.update = function(){
	var ids = {
	    bid: this.bacteria_report.id,
	    cid: this.chemical_report.id
	};
	this.chemical_report.update();
	this.bacteria_report.update();

	var data = serialize.call(this, ids);
	return $http.patch([URL, '/', data.id, '.json'].join(''), data);
    };

    return R;
}]);
