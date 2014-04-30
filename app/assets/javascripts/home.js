$(document).ready(function(){
    // Newsfeed
    var news = new News();
    news.fetch({
	success: function(){
	    var newsView = new NewsView({
		$el: $('#newsfeed'),
		collection: news,
		forwardButton: $('#newsfeedNext'),
		backButton: $('#newsfeedLast'),
		pageSize: 5,		
	    });
	    newsView.render();	    
	},
	error: function(err) {
	    console.log(err);
	}
    });
});
