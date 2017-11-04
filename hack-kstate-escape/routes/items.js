var express = require('express');
var router = express.Router();

var items = {
    "map": {
        has: false
    },
    "key": {
        has: false
    }
}

/* GET items listing. */
router.get('/', function(req, res, next) {

    var response;

    response = items;


    // Send the results
  res.send(items);
});

router.get('/map', function(req, res, next) {
    res.send(items.map);
});

router.post('/map',function(req, res, next){
    items.map.has = req.body.has;
    res.send(items.map);
});
router.get('/key', function(req, res, next) {
    res.send(items.map);
});

router.post('/key',function(req, res, next){
    items.map.has = req.body.has;
    res.send(items.map);
});

module.exports = router;
