var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var page = `
  <html style="background-size: cover;">
    <head>
        <title>Escape Hack K-State</title>
    </head>
    <body style='width: 100%; height: 100%; padding: 0; margin: 0;'>
        <div class="options" id="left" style="display: none;">&#9664;<br>Left</div>
        <div class="options" id="right" style="display: none;">&#9654;<br>Right</div>
        <div class="options" id="back" style="display: none;">Back<br>&#9660;</div>
        <div class="options" id="forward" style="display: none;">&#9650;<br>Forward</div>
        <div class="options" id="search" style="display: none;">&#128269;<br>Search</div>
        <div id="cutscene"><img src=""></div>
        <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
        <script>
            function loadThings() {
                $.getJSON("/player/room", function(data) {
                    $("html").css("background","url(/images/" + data.room + ".jpg) no-repeat center center fixed");
                    $.getJSON("/rooms/" + data.room, function(roomData) {
                        if (roomData.left) {
                            $("#left").show();
                        } else {
                            $("#left").hide();
                        }
                        if (roomData.right) {
                            $("#right").show();
                        } else {
                            $("#right").hide();
                        }
                        if (roomData.back) {
                            $("#back").show();
                        } else {
                            $("#back").hide();
                        }
                        if (roomData.forward) {
                            $("#forward").show();
                        } else {
                            $("#forward").hide();
                        }
                        if (roomData.search) {
                            $("#search").show();
                        } else {
                            $("#search").hide();
                        }

                    });
                });
                $.getJSON("/player/cutscene", function(data) {
                    if (data.hasCutscene) {
                        $("#cutscene").show()
                        $("#cutscene img").attr("src","/images/" + roomData.search.found.picture);
                        $.post("/player/cutscene", {"hasCutscene": false});
                        setTimeout(function() {
                            $("#cutscene").hide()
                        }, 5000);
                    } else {
                        $("#cutscene").hide()
                    }
                });

                setTimeout(loadThings, 2500);
            }
            loadThings();
        </script>
        <style>
            .options {
                font-size: 32px;
                color: white;
                position: absolute;
                text-align: center;
            }
            #left {
                top: 50%;
                left: 5;
            }
            #right {
                top: 50%;
                right: 5;
            }
            #back {
                bottom: 5;
                left: 50%;
                margin-left: -38px;
            }
            #forward {
                top: 5;
                left: 50%;
                margin-left: -41px;
            }
            #search {
                right: 5;
                bottom: 5;
            }
        </style>
    </body>
  </html>`;
  res.send(page);
});

module.exports = router;
