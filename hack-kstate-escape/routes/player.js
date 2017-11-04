var express = require('express');
var router = express.Router();

var currentRoom = "first";
var health = 4;

/* GET player info. */
router.get('/', function(req, res, next) {

    // Define the player info here


    // Send the results
  res.send('respond with a resource');
});

router.get('/room', function(req, res, next) {
    res.send(currentRoom);
});

router.post('/room',function(req, res, next){
    currentRoom = req.body;
    res.send(currentRoom);
});

module.exports = router;
