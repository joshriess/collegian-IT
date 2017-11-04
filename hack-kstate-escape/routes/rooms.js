var express = require('express');
var router = express.Router();

var rooms = {
  "start":{
    "picture":"",
    "search":"You search the room, but find nothing.",
    "back":false,
    "left":"startCorner",
    "right":"beocat",
    "exit":false,
    "forward":false
  },
  "beocat":{
    "picture":"",
    "search":"You try to open all the doors, but they are locked.",
    "back":"start",
    "left":false,
    "right":"startCorner",
    "exit":false,
    "forward":false
  },
  
}

/* GET rooms listing. */
router.get('/', function(req, res, next) {

    // Define the rooms here


    // Send the results
  res.send('respond with a resource');
});

module.exports = router;
