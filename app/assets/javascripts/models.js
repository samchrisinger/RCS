$(function() {
    User = Backbone.Model.extend({
	/* Attributes
	   ----------
	   id
	   email
	   first_name
	   last_name
	   password
	   admin?
	   guardian?
	   token
	 */
        url: '/users',
        defaults: {
            first_name: '',
	    last_name: '',
            email: ''
        },
        initialize: function() {

        }
    });

    Observation = Backbone.Model.extend({
	/* Attributes
	   ----------
	   id
	   user_id
	   lat 
	   lon
	   timestamp
	   guardian?
	   rcs_test_kit_use?
	   photo
	   metadata
	 */
	url: '/observations',
	defaults: {
	    guardian: false,
	    rcs_test_kit_use: false,
	    participants: 1
	},
        initialize: function() {

        }
    });

    Observations = Backbone.Collection.extend({
	url: '/observations',
        model: Observation
    });

    Metric = Backbone.Model.extend({
	url: '/metric',
        initialize: function() {

        }
    });
    
    Metrics = Backbone.Collection.extend({
	url: '/metrics',
        model: Metric
    });

    Story = Backbone.Model.extend({
	initialize: function(){

	}
    });

    News = Backbone.Collection.extend({
	url: '/news',
	model: Story,
    });

    Report = Backbone.Model.extend({
	url: '/report',
        initialize: function() {

        }
    });

    Reports = Backbone.Collection.extend({
	url: '/reports',
	model: Report
    });

});
