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
	'String': validator(function(value){
	    return value.toString();
	}),
	'Number': function(value){
	    var t = parseInt(value);
	    if (isNaN(t)){
		t = -1;
	    }
	    return t;
	},
	'Date': function(value){
	    return (new Date(value)).toLocaleDateString();
	},		
	'Time': function(value){
	    return (new Date(value)).toTimeString().split(' ')[0];
	},
	'DateTime': function(value){
	    return (new Date(value)).toLocaleDateString() + ' ' + (new Date(value)).toTimeString().split(' ')[0];
	}
    };
});
