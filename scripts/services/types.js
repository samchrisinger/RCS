app.factory('Types', function(){
    var validator = function(fn){
	return function(init){
	    var val = '';
	    if (init){
		val = init;
	    }	    
	    return function(value){
		if(value){
		    val = fn(value);
		}
		else{
		    return val;
		}
	    }	    
	};
    };

    return {
	'string': validator(function(value){
	    return value.toString();
	}),
	'number': function(value){
	    var t = parseInt(value);
	    if (isNaN(t)){
		t = -1;
	    }
	    return t;
	},
	'date': function(value){
	    return (new Date(value)).toLocaleDateString();
	},		
	'time': function(value){
	    return (new Date(value)).toTimeString().split(' ')[0];
	},
	'dateTime': function(value){
	    return (new Date(value)).toLocaleDateString() + ' ' + (new Date(value)).toTimeString().split(' ')[0];
	},
	'bool': function(value){
	    if (typeof value === 'boolean'){
		return value;
	    }
	    else if(value === 'true' || value === 'false'){
		if (value === 'true'){
		    return true;
		}
		else{
		    return false;
		}
	    }
	    return false;
	}
    };
});
