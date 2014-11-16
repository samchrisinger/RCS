app.factory('ChemicalReport', ['$resource', '$http', 'settings', 'Types', function($resource, $http, settings, Types) {
    var URL = settings.CC.api_base + '/' + settings.SCHEMA.Report['Chemical Report'].id;
    var res = $resource(URL);

    var defaults = {
	description_of_testing_site: {
            label: 'Description of testing site',
            value: '',
            type: 'text'
        },
        'used_rcs_test_kit?': {
            label: 'Used RCS test kit?',
            type: 'bool',
            value: false
        },
	water_temperature: {
            label: 'Water temperature',
            value: null,
            type: 'number'
        },
	air_temperature: {
            label: 'Air temperature',
            value: null,
            type: 'number'
        },
	dissolved_oxygen: {
            label: 'Dissolved oxygen',
            value: null,
            type: 'number'
        },
	pH: {
            label: 'pH',
            value: null,
            type: 'number'
        },
	turbidity: {
            label: 'Turbidity',
            value: null,
            type: 'number'
        },
	river_flow: {
            label: 'River flow',
            value: '',
            type: 'text'
        },
	water_color: {
            label: 'Water color',
            value: '',
            type: 'text'
        },
        water_odor: {
            label: 'Water odor',
            value: '',
            type: 'text'
        }
    };

    var CR = function(data) {
	var cr = this;
        // defaults
	angular.extend(this, defaults);
	
	this.keys = ['description_of_testing_site',
		     'used_rcs_test_kit?',
		     'water_temperature',
		     'air_temperature',		
		     'dissolved_oxygen',	
		     'pH',			
		     'turbidity',		
		     'river_flow',		
		     'water_color',		
		     'water_odor'];

	if(data){
	    Object.keys(data).map(function(key){
		if(cr.keys.indexOf(key) >= 0){
		    cr[key] = data[key];	    
		}
		else{
		    cr[key] = data[key];
		}
	    });
	}
    };

    CR.prototype.save = function() {
        var data = JSON.parse(JSON.stringify(this));
	delete data['keys'];

        for (var key in data) {
            if (data[key].value === null || data[key].value === "") {
                delete data[key];
            } else {
                data[key] = Types[data[key].type](data[key].value);
            }
        }
        return $http.post(URL + '.json', data);
    };

    CR.prototype.getOne = function(id){
	return $http.get([URL, '/', id, '.json'].join('')).then(function(res){
	    var data = res.data.response;

	    data.keys = ['description_of_testing_site',
			 'used_rcs_test_kit?',
			 'water_temperature',
			 'air_temperature',		
			 'dissolved_oxygen',	
			 'pH',			
			 'turbidity',		
			 'river_flow',		
			 'water_color',		
			 'water_odor'].filter(function(k){
			     return Object.keys(data).indexOf(k);
			 });	    
	    data.keys.map(function(k){
		var val = defaults[k];
		val.value = data[k];
		data[k] = val;
	    });
	    return data;	    
	});
    };

    CR.prototype.update = function(){

    };

    return CR;
}]);
