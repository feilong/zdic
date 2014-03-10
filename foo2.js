var fs = require('fs');
var system = require('system');
var casper = require('casper').create({
    pageSettings: {
        loadImages:  false,        // The WebPage instance used by Casper will
        loadPlugins: false         // use these settings
    },
    logLevel: "info",              // Only "info" level messages will be logged
    verbose: true                  // log messages will be printed out to the console
});

var target_char = system.args[4];
var target = encodeURI(target_char);
var url = 'http://www.zdic.net/c/cibs/ci/?z='+target;

casper.start(url);
casper.then(function() {
    this.echo('Page URL: '+this.getCurrentUrl());
    this.echo('Page Title: '+this.getTitle());
    this.echo(this.exists('a[href="javascript:void(0);"]'));
});

var count = 1;
var next_page_exists = true;
casper.repeat(30, function() {
    if (next_page_exists) {
	this.wait(5000);
	this.echo('Page Number: '+count);
	var links = this.evaluate(function() {
	    var elements = __utils__.findAll('a[href^="/c/"]');
	    var links = Array();
	    elements.forEach(function(entry) {
		links.push([entry.innerHTML, entry.getAttribute('href')]);
	    });
	    return links;
	});
	this.echo('=== Links Start ===');
	this.echo(links);
	this.echo('=== Links End ===');
	this.echo('Starting write links to files.');
	links.forEach(function(link) {
	    fs.write('URLs/'+target_char+'/'+link[0], link[1], 'w');
	});
    }
    count++;
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

casper.run();
