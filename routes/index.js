var express = require('express');
var router = express.Router();

var Node = require('../models/userModel');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/users', function (req,res) {

    Node.find({}, function (err,data) {
        if(!err){
            res.json(data);
        }else{
            res.json(err);
        }
    });
});


module.exports = router;
