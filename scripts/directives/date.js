app.directive('date', function(){
    return {
	require: 'ngModel',
	restrict: 'A',
	scope: {},
	link: function(scope, el, attrs, ngModel){
	    if(!ngModel) return;
	    
	    ngModel.$formatters.push(function(modelValue){
		return modelValue.toLocaleString().split(' ')[0];
	    });
	    ngModel.$parsers.push(function(viewValue){
		var vals = viewValue.split('/');
		var today = new Date();
		var y = vals[2] || today.getFullYear();;
		var m = vals[0] || today.getMonth();
		var d = vals[1] || today.getDate();	
		var old = ngModel.$modelValue;
		old.setYear(y);
		old.setMonth(m);
		old.setDate(d);
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
