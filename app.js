var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();
var Crawler = require("crawler");

var urls=[];

function getUrl(url) {
    url = 'http://www.fashiontrendsin.com/product-category/jackets/';
    request(url, function(error, response, html) {
        // First we'll check to make sure no errors occurred when making the request
        if (!error) {
            // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
            var $ = cheerio.load(html);

            $('div.product-loop div.product-image-wrapper a').each(function() { //root div for all product in page
                //console.log('founded');
                var product = $(this);
                var link = product.attr('href');
                urls.push(link);
               

            })

             console.log(urls);
        }

    })
};



app.get('/scrape', function(req, res) {
    url = 'http://www.fashiontrendsin.com/product-category/jackets/';
    request(url, function(error, response, html) {
        // First we'll check to make sure no errors occurred when making the request
        if (!error) {
            // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
            var out = "";
            var title, release, rating;
            var links = [];
            var $ = cheerio.load(html);

            $('div.product-loop div.product-image-wrapper a').each(function() { //root div for all product in page
                //console.log('founded');
                var product = $(this);
                var link = product.attr('href');
                links.push(link);
                console.log(link);

            })

            fs.writeFile('output.html', out, function(err) {

                console.log('File successfully written! - Check your project directory for the output.json file');

            });

            res.send('Done');
            scrape(links);
        }

    })
})




function scrape(links,function(){

}
    


    for (var link in links) {
        request(link, function(error, response, html) {

        });
    }

}
console.log('Magic happens on port' + process.env.PORT);
exports = module.exports = app;