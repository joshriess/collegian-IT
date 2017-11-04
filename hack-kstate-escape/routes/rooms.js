var express = require('express');
var router = express.Router();

var rooms = {
  "start":{
    "picture":"",
    "search":{
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
    "search":{
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
    "search":{
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
    "search":{
      "text": "The coffe shop is closer.",
      "found":{
        false
      }
    },
    "back":"startCorner",
    "left":false,//Change for late game
    "right":false,
    "exit":false,
    "forward":"radinas"
  },

  "radinas":{
    "picture":"",
    "search":{
      "text": "You search the bar, and find a key!",
      "found":{
        "key"
      }
    },
    "back":"atrium",
    "left":"board",
    "right":false,
    "exit":true,
    "forward":false
  },

  "board":{
    "picture":"",
    "search":{
      "text": "You find a board with a map on it!",
      "found":{
        "map"
      }
    },
    "back":"radinas",
    "left":false,
    "right":false,
    "exit":false,
    "forward":"durland"
  },

  "durland":{
    "picture":"",
    "search":{
      "text": "You don't find anything important",
      "found":{
        false
      }
    },
    "back":"board",
    "left":false,//will change with updates
    "right":false,
    "exit":true,
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
