var express = require('express');
var router = express.Router();
var cheerio = require('cheerio');
var request = require('request');
var fs = require('fs');
var agents = require('agents');
var async = require('async');

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index.html', {
        title: 'Express'
    });
});

router.get('/facebook', function(req, res) {
    var url = req.query.url;
    console.log(url);
    if (!url) {
        url = 'https://www.facebook.com/lamignonne.sweetshop/photos/a.745574142195059.1073742077.237010953051383/745574262195047/?type=3&theater';
    }
    var uri = {
        'uri': url,
        'headers': {
            'User-Agent': agents.randomAgentString()
        }
    }
    var json = [];

    request(uri, function(error, response, html) {
        if (!error && response.statusCode == 200) {


            //console.log(html);
            var $ = cheerio.load(html);
            //json.push(html);

            $('script').each(function(i) {
                var tmp = $(this).text().split(" ");
                //console.log(tmp.length);
                for (var key in tmp) {
                    var splited = tmp[key].split(",");
                    for (var keys in splited) {

                        if (filterEmail(splited[keys])) {
                            //console.log("founded");
                            var str = splited[keys];
                            //console.log(splited[keys]);
                            str = str.replace("\\u0040", "@");
                            str = str.replace(/["']/g, "");
                            str = str.replace(":", "");
                            //console.log(str);
                            json.push(str);
                        }

                    }
                }
                //console.log("founded");

                //console.log($(this).text());
                //json.push($(this).text());
            });

            fs.writeFile('output.txt', json, function(err) {

                //console.log('File successfully written! - Check your project directory for the output.json file');

            });
            console.log(json);
            res.send(json);

        }
    });

});

router.get('/pantown', function(req, res) {
    var url = req.query.url;
    console.log(url);
    if (!url) {
        url = 'http://www.pantown.com/group.php?display=board&id=25255&name=board1&area=4';
    }
    var uri = {
        'uri': url,
        'headers': {
            'User-Agent': agents.randomAgentString()
        }
    }
    var json = [];

    request(uri, function(error, response, html) {
        if (!error && response.statusCode == 200) {


            //console.log(html);
            var $ = cheerio.load(html);
            //json.push(html);

            $('p').each(function(i) {
                var tmp = $(this).text().split(" ");
                for (var key in tmp) {
                    if (filterEmail(tmp[key])) {
                        console.log(tmp[key]);
                        var str = tmp[key];
                        //console.log(splited[keys]);
                        str = str.replace("\\u0040", "@");
                        str = str.replace(/["']/g, "");
                        str = str.replace(":", "");
                        str = str.replace('\t','');
                        json.push(str);
                    }
                }
                //console.log("founded");
                //console.log($(this).text());
                //json.push($(this).text());
            });

            fs.writeFile('output.txt', json, function(err) {

                //console.log('File successfully written! - Check your project directory for the output.json file');

            });
            console.log(json);
            res.send(json);

        }
    });

});

function filterEmail(element) {
    var email = 'mail.com';
    if (!element) return false;
    //if (element.indexOf(email) > -1) {json.push(element);}
    return element.indexOf(email) > -1
};

module.exports = router;
