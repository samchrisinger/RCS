app.directive('disableIf', function($rootScope){
    return {
	restrict: 'A',
	scope: false,
	link: function(scope, el, attrs){
	    attrs.$observe('disableIf', function(disableIf){
		if(disableIf === "true"){
		    el.find('input').attr('disabled', true);
		    el.closest('.overlay').addClass('overlayActive');
		}
		else{
		    el.find('input').attr('disabled', false);
		    el.closest('.overlay').removeClass('overlayActive');
		}
	    });
	}
    };
});
