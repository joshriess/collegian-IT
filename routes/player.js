var express = require('express');
var router = express.Router();

var player = {
    "currentRoom": "startRoom",
    "hasKey": false
}

var hasCutscene;

router.get('/', function(req, res, next) {
  res.send(player);
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

router.get('/key', function(req, res, next) {
    var response = {"hasKey": player.hasKey};
    res.send(response);
});

router.post('/key',function(req, res, next){
    player.hasKey = req.body.hasKey;
    var response = {"hasKey": player.hasKey};
    res.send(response);
});

module.exports = router;
