app.filter('correctify', function() {
    return function(input) {
	return input.charAt(0).toUpperCase() + input.slice(1).split('_').join(' ');
    };
});
