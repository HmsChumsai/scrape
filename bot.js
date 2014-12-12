var Model = require('./Model');
var Scraper = require('./Scraper');
var Urls = [];
var request = require('request');
var cheerio = require('cheerio');



var url = 'http://www.fashiontrendsin.com/product-category/jackets/';
generateUrls(url);

var numberOfParallelRequests = 20;


function generateUrls(url) {
    console.log('generateUrls() ' + url);
    //url = 'http://www.fashiontrendsin.com/product-category/jackets/';
    request(url, function(error, response, html) {
        console.log('request');
        // First we'll check to make sure no errors occurred when making the request
        if (!error) {
            // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
            var $ = cheerio.load(html);
            console.log('connected');
            $('div.product-loop div.product-image-wrapper a').each(function() { //root div for all product in page
                //console.log('founded');
                var product = $(this);
                var link = product.attr('href');
                console.log('link ' + link);
                Urls.push(link);

            });
            for (var i = 0; i < numberOfParallelRequests; i++) {
                wizard();
            }
        }
    })
};

function wizard() {
    // if the Urls array is empty, we are Done!!
    if (!Urls.length) {
        return console.log('Done!!!!');
    }
    //console.log(Urls);
    var url = Urls.pop();
    console.log(url);
    var scraper = new Scraper(url);
    var model;
    console.log('Requests Left: ' + Urls.length);
    // if the error occurs we still want to create our
    // next request
    scraper.on('error', function(error) {
        console.log(error);
        wizard();
    });
    // if the request completed successfully
    // we want to store the results in our database
    scraper.on('complete', function(listing) {
        /*
        model = new Model(listing);
        model.save(function(err) {
            if (err) {
                console.log('Database err saving: ' + url);
            }
        });
        */
        wizard();
    });
}
