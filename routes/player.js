var express = require('express');
var router = express.Router();

var player = {
    "currentRoom": "startRoom",
    "health": 4
}

var hasCutscene;

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
    var response = {"room": player.currentRoom};
    res.send(response);
});

router.post('/room',function(req, res, next){
    player.currentRoom = req.body.room;
    res.send(player.currentRoom);
});

router.get('/cutscene', function(req, res, next) {
    var response = {"hasCutscene": hasCutscene};
    res.send(response);
});

router.post('/cutscene',function(req, res, next){
    hasCutscene = req.body.hasCutscene;
    res.send(hasCutscene);
});


module.exports = router;
