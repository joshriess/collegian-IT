var express = require('express');
var router = express.Router();

var rooms = {
  "start":{
    "description":"You wake up in a dark, empty room",
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
    "description":"You see a hallway full of doors.",
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
    "description":"You see a great hall ahead",
    "search":{
      "text": "You see a coffee shop in the distance.",
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
    "description":"You are in a great room with a coffeshop.",
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
    "description":"The smell of the coffee is strong",
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
    "description":"You see a digital board",
    "search":{
      "text": "You find a map on the board!",
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
    "description":"You see a big auditorium and glass doors",
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

router.get('/:roomName', function(req , res){
    var roomName = req.params.roomName;
    res.send(rooms[roomName]);
});

module.exports = router;
