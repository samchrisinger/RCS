app.directive('let', function(){
    return {
	restrict: 'E',
	scope: false,
	link: function(scope, el, attrs){
	    if(attrs['eq']){
		scope[attrs['var']] = JSON.parse(attrs['eq']);
	    }
	    else{
		scope[attrs['var']] = null;
	    }
	}
    };
});
