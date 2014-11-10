app.factory('ChemicalReport', ['$resource', '$http',function ($resource, $http) {
    var URL = 'http://api.commonscloud.org/v2/type_e90f64c1fcae4433ba5fa42e555052d1.json';
    var res = $resource(URL);
    var CR = function(){};
    
    CR.prototype.save = function(){
	var data = JSON.parse(JSON.stringify(this));
	for(var key in data){
	    data[key] = data[key].value;
	    if(data[key] === null){
		delete data[key];
	    }
	}
	return $http.post(URL, data);
    };
    
    return CR;
}]);

