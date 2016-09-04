/**
 * Created by ajantha on 5/11/16.
 */

var mongoose = require('mongoose');

var options = {
    server: { poolSize: 100 }
};

var db = mongoose.connect('mongodb://localhost/park',options, function(err){
    if(err) console.log(err);
    else console.log("connected to database successfully");
});

module.exports = db;

