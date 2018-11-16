var request = require("request");
var cheerio = require("cheerio");
var axios = require("axios")

var scrape = function(cb) {
    request("https://news.ycombinator.com/", function(err,res,body){
       // console.log(res,body);
        var $ = cheerio.load(body);
        var articles = [];
        $(".title").each(function(i,element){
            var title = $(element).children("a").text();
      var link = $(element).children("a").attr("href");
           
           // console.log(title);
            if (title && link) {
                var headNt = title.replace(/(\r\n|\n|\r|\t|\s+)/gm," ").trim();
             var sumNt = link.replace(/(\r\n|\n|\r|\t|\s+)/gm," ").trim();
            
                var dataToAdd = {
                    headline:headNt,
                    summary: sumNt
                };
                articles.push(dataToAdd);
            }
        });
        cb(articles);
    });
};

module.exports = scrape;