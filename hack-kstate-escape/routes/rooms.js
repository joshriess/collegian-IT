var express = require('express');
var router = express.Router();

var rooms = {
  "start":{
    "picture":"",
    "search":,{
      "text": "You search the room, but find nothing.",
      "found":{
        false
      }
    },
    "back":false,
    "left":"startCorner",
    "right":"beocat",
    "exit":false,
    "forward":false
  },


  "beocat":{
    "picture":"",
    "search":,{
      "text": "You try to open all the doors, but they are locked.",
      "found":{
        false
      }
    },
    "back":"start",
    "left":false,
    "right":"startCorner",
    "exit":false,
    "forward":false
  },


  "startCorner":{
    "picture":"",
    "search":,{
      "text": "You see a coffee shop ahead.",
      "found":{
        false
      }
    },
    "back":"start",
    "left":false,
    "right":"beocat",
    "exit":false,
    "forward":"atruim"
  },


  "atrium":{
    "picture":"",
    "search":,{
      "text": "The coffe shop is closer.",
      "found":{
        false
      }
    },
    "back":"startCorner",
    "left":false,//Change for late game
    "right":false,
    "exit":true,
    "forward":"radinas"
  },

  
  "radinas":{
    "picture":"",
    "search":{
      "text": "You search the room, but find nothing.",
      "found":{
        "key"
      }
    },
    "back":false,
    "left":"startCorner",
    "right":"beocat",
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
