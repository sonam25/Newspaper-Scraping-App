var express = require("express");
var expressHandlebars = require("express-handlebars");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var axios = require("axios")
var PORT = process.env.PORT || 3000;

var app = express();

var router = express.Router();

require("./config/routes")(router);

app.use(express.static(__dirname + "/public"));

app.engine("handlebars", expressHandlebars({
    defaultLayout:"main"
}));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(router);

var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(db, function(err){
 if(err){
     console.log(err);
 }
 else{
     console.log("mongoose connection is successfull");
 }
});

app.listen(PORT, function(){
    console.log("Listening on port:" + PORT);
});