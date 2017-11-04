var express = require('express');
var router = express.Router();

var player = {
    "currentRoom": "start",
    "health": 4
}

router.get('/', function(req, res, next) {
  res.send(player);
});

router.get('/health', function(req, res, next) {
  res.send(player.health.toString());
});

router.get('/health/decrease', function(req, res, next) {
    player.health--;
    res.send(player.health.toString());
});

router.get('/health/increase', function(req, res, next) {
    player.health++;
    res.send(player.health.toString());
});

router.get('/room', function(req, res, next) {
    var response = JSON.stringify(player.currentRoom);
    res.send(response);
});

router.post('/room',function(req, res, next){
    player.currentRoom = req.body.room;
    res.send(player.currentRoom);
});

module.exports = router;
