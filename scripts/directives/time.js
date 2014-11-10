app.directive('time', function(){
    return {
	require: 'ngModel',
	restrict: 'A',
	scope: {},
	link: function(scope, el, attrs, ngModel){
	    if(!ngModel) return;
	    
	    ngModel.$formatters.push(function(modelValue){
		return modelValue.toTimeString().split(' ')[0].split(':').slice(0,2).join(':');
	    });
	    ngModel.$parsers.push(function(viewValue){
		var vals = viewValue.split(':');
		var today = new Date();
		var h = vals[0] || today.getHours();
		var m = vals[1] || today.getMinutes();
		var old = ngModel.$modelValue;
		old.setHours(h);
		old.setMinutes(m);
		return old;
	    });
	    /*
	    ngModel.$render = function(){
		var d = new Date(ngModel.$modelValue);
		el.val(d.toLocaleString().split(' ')[0]);
	    };
	    */
	}
    };
});
