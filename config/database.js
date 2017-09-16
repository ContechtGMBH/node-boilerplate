var db = module.exports = {};

var username = "";
var password = "";
var host = ""
var database = ""

// Your Database Connection
db.conString = "mongodb://"+username+":"+password+"@"+host+"/"+database;
