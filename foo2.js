var url = 'http://www.zdic.net/c/cibs/ci/?z=%E9%A9%AC';

var casper = require('casper').create({
    clientScripts:  [
	'http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js'
    ],
    pageSettings: {
        loadImages:  false,        // The WebPage instance used by Casper will
        loadPlugins: false         // use these settings
    },
    logLevel: "info",              // Only "info" level messages will be logged
    verbose: true                  // log messages will be printed out to the console
});

casper.start(url);
casper.then(function() {
    console.log(this.getCurrentUrl());
    this.echo(this.getTitle());
    this.click('a[href="javascript:void(0);"]');
    this.echo(this.exists('a[href="javascript:void(0);"]'));
    this.wait(10000);
});
casper.then(function() {
    var txt = this.evaluate(function() {
	var elements = __utils__.findAll('a[href="javascript:void(0);"]');
	var li = Array();
	elements.forEach(function(entry) {
	    li.push(entry.innerHTML);
	});
	return li;
    });
    this.echo(txt);
});
casper.then(function() {
    this.echo(this.exists('a[href^="/c/"]'));
});
var links;
casper.then(function() {
    links = this.evaluate(function() {
	var elements = __utils__.findAll('a[href^="/c/"]');
	var links = Array();
	elements.forEach(function(entry) {
	    // links.push(entry.getAttribute('href'));
	    links.push(entry.innerHTML);
	});
	return links
	// return Array.prototype.forEach.call(elements, function(e) {
	//     return e.getAttribute('href');
	// });
    });
});
casper.then(function() {
    this.echo(links);
});
casper.run();
// var page = require('webpage').create();  

// function mouseclick( element ) {
//     // create a mouse click event
//     var event = document.createEvent( 'MouseEvents' );
//     event.initMouseEvent( 'click', true, true, window, 1, 0, 0 );
 
//     // send click to element
//     element.dispatchEvent( event );
// }


// page.open(url, function() {
//     page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function() {
//         page.evaluate(function(mouseclick_fn) {
// 	    var elem = document.querySelector('a');
// 	    console.log(elem);
// 	    // mouseclick_fn(elem);
// 	    // $("a").each(function(index) {
// 	    // 	if ($(this).attr('href') === 'javascript:void(0);') {
// 	    // 	    mouseclick_fn($(this));
// 	    // 	}
// 	    // })
// 	}, mouseclick)
//     })
// });
