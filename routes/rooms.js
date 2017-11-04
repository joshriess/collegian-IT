var express = require('express');
var router = express.Router();

var key = false;
var rooms = {
  "startRoom":{
    "description":"You wake up in a dark, empty room",
    "search":{
      "text": "It seems that people were here, but left in a hurry",
      "found":{
        has: false
      }
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
      "found":{
       has: false
      }
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
      "found":{
        has: false
      }
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
      "found":{
        has: false
      }
    },
    "back":"beocat",
    "left":false,
    "right":false,
    "exit":false,
    if(key){
      "forward":"loungeExit"
    }
    else{
      "forward":false
    }
  },

  "studentLounge":{
    "description":"You see a room of tables, chairs, and a printer",
    "search":{
      "text": "You smell the remains of sleepless nights and broken dreams.",
      "found":{
        has: false
      }
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
      "found":{
        has: false
      }
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
      if(key){
        "text": "Congratulations, you WIN!"
      }
      else{
        "text":"The door seems to need a key to open."
      }
    },
    "back":"loungeHall",
    "left":false,
    "right":false,
    "exit":false,
    "forward":false
  },

  "computerScienceHallway":{
    "description":"You see a great hall ahead.",
    "search":{
      "text": "You find a fire extenguisher.",
      "found":{
       has: false
      }
    },
    "back":"startRoom",
    "left":false,
    "right":"beocat",
    "exit":false,
    "forward":"atrium"
  },

  "engineeringLab":{
    "description":"You see a lab full of computers",
    "search":{
      "text": "You find a crying engineer.  You aren't sure if it is because everyone is missing, or they are an engineer.",
      "found":{
        has: false
      }
    },
    "back":"computerScienceHallway",
    "left":false,
    "right":false,
    "exit":true,
    "forward":false
  },
  
  "atrium":{
    "description":"You seem to be in a great room with a conference room and coffeshop.",
    "search":{
      "text": "You find tables and chairs, nothing useful for the current situation",
      "found":{
        has: false
      }
    },
    "back":"computerScienceHallway",
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
        key = true;
      },
      "picture": "RFIDkey.jpg"
    },
    "back":"atrium",
    "left":"board",
    "right":false,
    "exit":true,
    "forward":false
  },

  "board":{
    "description":"You see a digital board.",
    "search":{
      "text": "You find a map on the board!",
      "found":{
       has: "map"
      },
      "picture": "board.jpg"
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
      "found":{
        has: false
      }
    },
    "back":"board",
    "left":false,//will change with updates
    "right":false,
    "exit":true,
    "forward":"durlandExit"
  },

  "durlandExit":{
    "description":"You see a set of doors that is blocked.",
    "search":{
      "text": "You find the remains of a lan party",
      "found":{
        has: false
      }
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
