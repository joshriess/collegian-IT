var express = require('express');
var router = express.Router();

var rooms = {
  "start":{
    "picture":"start.jpg",
    "search":{
      "text": "You search the room, but find nothing.",
      "found":{
        has: false
      }
    },
    "back":false,
    "left":"startCorner",
    "right":"beocat",
    "exit":false,
    "forward":false
  },

  "beocat":{
    "picture":"beocat.jpg",
    "search":{
      "text": "You try to open all the doors, but they are locked.",
      "found":{
       has: false
      }
    },
    "back":"start",
    "left":false,
    "right":"startCorner",
    "exit":false,
    "forward":false
  },

  "startCorner":{
    "picture":"startCorner.jpg",
    "search":{
      "text": "You see a coffee shop ahead.",
      "found":{
       has: false
      }
    },
    "back":"start",
    "left":false,
    "right":"beocat",
    "exit":false,
    "forward":"atruim"
  },

  "atrium":{
    "picture":"atrium.jpg",
    "search":{
      "text": "The coffe shop is closer.",
      "found":{
        has: false
      }
    },
    "back":"startCorner",
    "left":false,//Change for late game
    "right":false,
    "exit":false,
    "forward":"radinas"
  },

  "radinas":{
    "picture":"radinas.jpeg",
    "search":{
      "text": "You search the bar, and find a key!",
      "found":{
        hs: "key"
      }
    },
    "back":"atrium",
    "left":"board",
    "right":false,
    "exit":true,
    "forward":false
  },

  "board":{
    "picture":"board.jpg",
    "search":{
      "text": "You find a board with a map on it!",
      "found":{
       hs: "map"
      }
    },
    "back":"radinas",
    "left":false,
    "right":false,
    "exit":false,
    "forward":"durland"
  },

  "durland":{
    "picture":"durland.jpg",
    "search":{
      "text": "You don't find anything important",
      "found":{
        has: false
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
  res.send(rooms);
});

module.exports = router;
