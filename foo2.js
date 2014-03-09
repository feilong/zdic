var url = 'http://www.zdic.net/c/cibs/ci/?z=%E9%A9%AC';
var target = '%E9%A9%AC';

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
casper.then(function() { // test folder
});
casper.then(function() { // test url encode
    this.echo('马');
    this.echo(encodeURI('马'));
});
casper.then(function() {
    this.echo('Page URL: '+this.getCurrentUrl());
    this.echo('Page Title: '+this.getTitle());
    // this.click('a[href="javascript:void(0);"]');
    this.echo(this.exists('a[href="javascript:void(0);"]'));
    // this.wait(10000);
});

var count = 1;
var links;
var next_page_exists = true;
casper.repeat(3, function() {
    this.wait(1000);
    if (next_page_exists) {
	this.echo('Page Number: '+count);
	links = this.evaluate(function() {
	    var elements = __utils__.findAll('a[href^="/c/"]');
	    var links = Array();
	    elements.forEach(function(entry) {
		// links.push(entry.getAttribute('href'));
		links.push(entry.innerHTML);
	    });
	    return links;
	});
	this.echo('=== Links Start ===');
	this.echo(links);
	this.echo('=== Links End ===');
    }
    count++;
    // this.echo(count);
    if (this.exists('a[onclick="shd(\'' + target + '|' + count  + '\');"]')) {
    	this.echo('Next page exists.');
	next_page_exists = true;
	this.click('a[onclick="shd(\'' + target + '|' + count  + '\');"]');
	this.echo('Clicking next page.');
    } else {
    	this.echo('Next page doesn\'t exists');
	next_page_exists = false;
    }
});

// casper.then(function() { // find link for the next page
//     next_page_link = this.evaluate(function() {
// 	var elements = __utils__.findAll('a[href="javascript:void(0);"]');
// 	var next_page_link;
// 	elements.forEach(function(entry) {
// 	    if (entry.innerHTML === '下一页') {
// 		next_page_link = entry.getAttribute;
// 	    }
// 	});
// 	return next_page_link;
//     });
//     this.echo(next_page_link);
// });

// casper.then(function() {
//     this.echo(this.exists('a[href^="/c/"]'));
// });

// var links;
// casper.then(function() {
//     links = this.evaluate(function() {
// 	var elements = __utils__.findAll('a[href^="/c/"]');
// 	var links = Array();
// 	elements.forEach(function(entry) {
// 	    // links.push(entry.getAttribute('href'));
// 	    links.push(entry.innerHTML);
// 	});
// 	return links;
// 	// return Array.prototype.forEach.call(elements, function(e) {
// 	//     return e.getAttribute('href');
// 	// });
//     });
// });
// casper.then(function() {
//     this.echo(links);
// });
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
