NewsView = Backbone.View.extend({
    render: function(){
	this.$el.html('');

	var source = $('#news-template').html();
	var template = Handlebars.compile(source);
	var start = this.page*this.pageSize;
	var stop = start+this.pageSize;
	var subset = this.collection.toArray().slice(start,stop);
	var html = template(_.map(subset, function(model){
	    return model.toJSON();
	}));

	this.$el.html(html);
    },
    next: function(self){
	self.page++;
	if(self.page == self.maxPages)
	    self.forwardButton.prop('disabled', true);
	self.render();
    },
    last: function(self){
	self.page--;
	if(self.page == 0)
	    self.backButton.prop('disabled', true);
	self.render();
    },
    initialize: function(attributes){	
	for(var attr in attributes)
	    this[attr] = attributes[attr];
	this.page = 0;
	this.maxPages = Math.ceil(this.collection.length/this.pageSize);
	this.backButton.prop('disabled', true);
	if(this.maxPages == 1)
	    this.forwardButton.prop('disabled', true);

	var self = this;
	this.backButton.click(function(){
	    self.last(self)
	});
	this.forwardButton.click(function(){
	    self.next(self);
	});
    }
});

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
