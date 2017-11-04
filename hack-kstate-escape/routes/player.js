var express = require('express');
var router = express.Router();

var player = {
    "currentRoom": "first",
    "health": 4
}

router.get('/', function(req, res, next) {
  res.send(player);
});

router.get('/health', function(req, res, next) {
  res.send(player.health);
});

router.get('/health/decrease', function(req, res, next) {
    player.health--;
    res.send(player.health);
});

router.get('/health/increase', function(req, res, next) {
    player.health++;
    res.send(player.health);
});

router.get('/room', function(req, res, next) {
    res.send(player.currentRoom);
});

router.post('/room',function(req, res, next){
    player.currentRoom = req.body;
    res.send(player.currentRoom);
});

module.exports = router;
