app.factory('BacteriaReport', ['$resource', '$http', 'settings', 'Types', function($resource, $http, settings, Types) {
    var URL = settings.CC.api_base + '/' + settings.SCHEMA.Report['Bacteria Report'].id;
    var res = $resource(URL);

    var defaults = {
        description_of_testing_site: {
            label: 'Description of testing site',
            value: '',
            type: 'text'
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
        water_color: {
            label: 'Water color',
            value: '',
            type: 'text'
        },
        water_odor: {
            label: 'Water odor',
            value: '',
            type: 'text'
        },
        colonies_river_left: {
            label: 'Colonies - river left',
            value: null,
            type: 'number'
        },
        colonies_river_right: {
            label: 'Colonies - river right',
            value: null,
            type: 'number'
        },
        river_flow: {
            label: 'River flow',
            value: null,
            type: 'number'
        }
    };

    var BR = function(data) {
	var br = this;
        // defaults
        angular.extend(this, defaults);
	
	this.keys = ["description_of_testing_site",
		     "water_temperature",
		     "air_temperature",
		     "water_color",
		     "water_odor",
		     "colonies_river_left",
		     "colonies_river_right",
		     "river_flow"];

	Object.keys(data).map(function(key){
	    if(br.keys.indexOf(key) >= 0){
		br[key] = data[key];
	    }
	    else {
		br[key] = data[key];
	    }
	});	
    };

    BR.prototype.save = function() {
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

    BR.prototype.getOne = function(id) {
        return $http.get([URL, '/', id, '.json'].join('')).then(function(res) {
            var data = res.data.response;
            data.keys = ["description_of_testing_site",
                "water_temperature",
                "air_temperature",
                "water_color",
                "water_odor",
                "colonies_river_left",
                "colonies_river_right",
                "river_flow"
            ].filter(function(k) {
                return Object.keys(data).indexOf(k);
            });


            return data;
        });
    };

    BR.prototype.update = function(){

    };

    return BR;
}]);
