/**
 * Created by ajantha on 9/2/16.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/home', function(req, res, next) {
    res.header(200);
    res.render('pages/home',{user:{firstName:"Ajantha"}});
});

router.get('/mqtt-data', function (req,res) {
    res.header(200);
    res.render('pages/mqtt',{user:{firstName:"Ajantha"}});
});

router.get('/places', function (req,res) {
    res.header(200);
    res.render('pages/places',{user:{firstName:"Ajantha"}});
});

router.get('/nodes', function (req,res) {
    res.header(200);
    res.render('pages/nodes',{user:{firstName:"Ajantha"}});
});


module.exports = router;
