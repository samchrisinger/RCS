app.factory('App', ['$http', 'settings',
    function($http, settings) {
        /////////
        function instantiateModel(info, beforeSave) {
            app.factory(info.name, ['$resource', '$http',
                function($resource, $http) {
                    var URL = 'http://api.commonscloud.org/v2/' + info.storage + '.json';
                    var res = $resource(URL);
                    var R = function() {
                        this.save = function(children) {
			    // deep copy
			    var data = JSON.parse(JSON.stringify(this));
			    data = beforeSave(data, children);
                            return $http.post(URL, data);
                        };
                    };
                    return R;
                }
            ]);
        }
	function processSchemaDef(key, schema, templates){	    
	    var def = schema[key];
	    var children = Object.keys(def);
	    var subset = templates.filter(function(t){
		return children.indexOf(t.name) != -1
	    });	
	    instantiateModel(def, function(_children, info, child_ids){
		// relationships
		for(var j = 0; j < _children.length; j++){
		    var child = _children[j];
		    data[child.storage] = child_ids[child.name];
		}
		// clean null data
		for (var key in data) {
                    if (data[key] === null || key.indexOf('_') == 0) {
                        delete data[key];
                    }
                }
		// correct geodata
		if (data.lat || data.lon) {
		    data.geometry = JSON.stringify({
                        geometries: [{
                            coordinates: [
                                parseFloat(data.lat),
                                parseFloat(data.lon)
                            ],
                            type: "Point"
                        }],
                        type: "GeometryCollection"
                    });
                    delete data.lat;
                    delete data.lon;
                }
	    }.bind({}, children));
	}
        function alignAndInstantiate(schema, templates) {
	    var keys = Object.keys(schema);
	    for (var i = 0; i < keys.length; i++){
		processSchemaDef(keys[i], schema, templates);
	    }
        }
        /////////
        var URL = settings.CC.api_base + '/applications/' + settings.CC.app_id;
        var A = function() {
            var attrs = {};

            this.info = function() {
                return $http.get(URL + '.json');
            };
            this.load = function(cb) {
                return $http.get(URL + '/templates.json').then(function(res) {
                    var schema = settings.SCHEMA;
                    var templs = res.data.response.templates;
		    // todo generalize
                    //alignAndInstantiate(schema, templs);		    
		    return templs;
                });
            };
        };

        return A;
    }
]);
