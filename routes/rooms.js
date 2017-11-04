var express = require('express');
var router = express.Router();

var key = false;
var getkey;
if(key){
    getkey = "loungeExit";
}
else{
    getkey = false;
}
var rooms = {
  "startRoom":{
    "niceName":"",
    "description":"You wake up in a dark, empty room",
    "search":{
      "text": "It seems that people were here, but left in a hurry",
      "found": false
    },
    "back":false,
    "left":"computerScienceHallway",
    "right":"beocat",
    "exit":false,
    "forward":false
  },

  "beocat":{
    "description":"You see a hallway full of doors.",
    "search":{
      "text": "You see a supercomputer",
      "found": false
    },
    "back":"startRoom",
    "left":false,
    "right":"computerScienceHallway",
    "exit":false,
    "forward":false
  },

  "gameLab":{
    "description":"You see a room full of powerful computers",
    "search":{
      "text": "You find the remains of a lan party",
      "found": false
    },
    "back":"beocat",
    "left":false,
    "right":false,
    "exit":false,
    "forward":false
  },

  "loungeHall":{
    "description":"You are in a hall surrounded by computer labs.",
    "search":{
      "text": "You see what looks like an exit staircase.",
      "found": false
    },
    "back":"beocat",
    "left":false,
    "right":false,
    "exit":false,

  },

  "studentLounge":{
    "description":"You see a room of tables, chairs, and a printer",
    "search":{
      "text": "You hear the sound of typing from somewhere in the room.",
      "found": false
    },
    "back":"loungeHall",
    "left":false,
    "right":false,
    "exit":false,
    "forward":false
  },

  "linuxLab":{
    "description":"You see a bunch of computers that could only run remote desktop.",
    "search":{
      "text": "You find a missing HDMI cable.",
      "found": false
    },
    "back":"loungeHall",
    "left":false,
    "right":false,
    "exit":false,
    "forward":false
  },

  "loungeExit":{
    "description":"You see a staircase that leads to an exit",
    "search":{
      "text":getkey
    },
    "back":"loungeHall",
    "left":false,
    "right":false,
    "exit":true,
    "forward":false
  },

  "computerScienceHallway":{
    "description":"You see a great hall ahead.",
    "search":{
      "text": "You find a fire extenguisher.",
      "found": false
    },
    "back":"startRoom",
    "left":"engineeringLab",
    "right":"beocat",
    "exit":false,
    "forward":"atrium"
  },

  "engineeringLab":{
    "description":"You see a lab full of computers",
    "search":{
      "text": "You find a crying engineer.  You aren't sure if it is because everyone is missing, or they are an engineer.",
      "found": false
    },
    "back":"computerScienceHallway",
    "left":false,
    "right":false,
    "exit":false,
    "forward":false
  },

  "atrium":{
    "description":"You seem to be in a great room with a conference room and coffeshop.",
    "search":{
      "text": "You find tables and chairs, nothing useful.",
      "found": false
    },
    "back":"computerScienceHallway",
    "left":"staircase",//Change for late game
    "right":false,
    "exit":false,
    "forward":"radinas"
  },

  "staircase":{
    "description":"You see a staircase that goes downstairs",
    "search":{
      "text": "I wonder what is downstairs",
      "found": false
    },
    "back":"atrium",
    "left":false,
    "right":false,
    "exit":false,
    "forward":"library"
  },

  "library":{
    "description":"You see a library that doesn't have any books.",
    "search":{
      "text": "You smell the remains of sleepless nights and broken dreams.",
      "found": false
    },
    "back":"durlandAuditorium",
    "left":"staircase",
    "right":false,
    "exit":false,
    "forward":"libraryComputerLab"
  },

  "libraryComputerLab":{
    "description":"You see a computer lab and a door at the end of the hall.",
    "search":{
      "text": "You see a door at the end of the hall",
      "found": false
    },
    "back":"library",
    "left":false,
    "right":false,
    "exit":false,
    "forward":"libraryExit"
  },

  "libraryExit":{
    "description":"You see a library that doesn't have any books.",
    "search":{
      "text": "Congratulations, you WIN!",
      "found": false
    },
    "back":"libraryComputerLab",
    "left":false,
    "right":false,
    "exit":true,
    "forward":false
  },

  "radinas":{
    "description":"The smell of the coffee is strong",
    "search":{
      "text": "You search the bar, and find a key!",
      "found":{
        "key": true,
        "map": false,
        "picture": "RFIDkey.jpg"
      },
    },
    "back":"atrium",
    "left":"board",
    "right":false,
    "exit":false,
    "forward":false
  },

  "radinasExit":{
    "description":"You see a locked exit",
    "search":{
      "text": "You find an exit that seems to be welded shut.",
      "found": false
    },
    "back":"radinas",
    "left":false,
    "right":false,
    "exit":false,
    "forward":false
  },

  "board":{
    "description":"You see a digital board.",
    "search":{
      "text": "You find a map on the board!",
      "found":{
       "key": false,
       "map": true,
       "picture": "map.jpg"
      },
    },
    "back":"radinas",
    "left":false,
    "right":false,
    "exit":false,
    "forward":"durlandAuditorium"
  },

  "durlandAuditorium":{
    "description":"You see a big auditorium and glass doors",
    "search":{
      "text": "You see a picture of a man that seems important.",
      "found": false
    },
    "back":"board",
    "left":"library",//will change with updates
    "right":false,
    "exit":false,
    "forward":"durlandExit"
  },

  "durlandExit":{
    "description":"You see a set of doors that is blocked.",
    "search":{
      "text": "You find the remains of a lan party",
      "found": false
    },
    "back":"durlandAuditorium",
    "left":false,
    "right":false,
    "exit":false,
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
