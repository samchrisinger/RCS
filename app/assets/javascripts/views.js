ObservationsView = Backbone.View.extend({
    
    tagName: 'li',
    
    events: {
        'click #add-input':  'getFriend',
    },
	
    initialize: function() {
        var thisView = this;
	
    },
    
    render: function( model ) {

    },	
});
