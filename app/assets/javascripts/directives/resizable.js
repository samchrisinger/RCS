app.directive('resizable', function() {
    return {   
        restrict: 'A',
        link: function(scope, element, attrs) {
            $(element).resizable(attrs);
        }
    };
});
