require("jsdom").env("", function(err, window) {
    if (err) {
        console.error(err);
        return;
    }
 
    var $ = require("jquery")(window);
});

$(document).ready(function(){
	$('ul li').click(function(){
	    $('li').removeClass("active");
	    $(this).addClass("active");
	});
});