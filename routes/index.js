var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var page = `
  <html style="background: url(/images/startRoom.jpg) no-repeat center center fixed;">
    <head>
        <title>Hack K-State Escape</title>
        <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
        <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png">
        <link rel="manifest" href="/images/manifest.json">
        <link rel="mask-icon" href="/images/safari-pinned-tab.svg" color="#5bbad5">
        <link rel="shortcut icon" href="/images/favicon.ico">
        <meta name="msapplication-config" content="/images/browserconfig.xml">
        <meta name="theme-color" content="#ffffff">
        <style>
            html {
                background-size: cover !important;
            }
            div, h1, h2 {
                font-family: 'Roboto', sans-serif;
            }
            h1, h2 {
                color: white;
            }
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
            .indicator-done {
                color: green;
            }
            .indicator-notsearched {
                color: yellow;
            }
        </style>
    </head>
    <body style='width: 100%; height: 100%; padding: 0; margin: 0;'>
        <div id="intro" style="width: 85%;padding-top:8%;margin-left:auto;margin-right:auto;text-align:center;"><img src="/images/logo.png" style="max-width: 80%;"><br><h1>Welcome to Hack K-State Escape!</h1><h2>Say "Alexa, play Escape" to get started, then say any command available on the screen.</h2></div>
        <div class="options" id="left" style="display: none;">&#9664;<br>Left<br><i id="left-searched" class="fa"></i></div>
        <div class="options" id="right" style="display: none;">&#9654;<br>Right<br><i id="right-searched" class="fa"></i></div>
        <div class="options" id="back" style="display: none;"><i id="back-searched" class="fa"></i><br>Back<br>&#9660;</div>
        <div class="options" id="forward" style="display: none;">&#9650;<br>Forward<br><i id="forward-searched" class="fa"></i></div>
        <div class="options" id="search" style="display: none;"><i class="fa fa-search" aria-hidden="true"></i><br>Search/Interact</div>
        <div id="cutscene" style="width: 100%; height: 100%; margin: 0; padding: 0; display: none;"><img src="" style="width: 100%; height: 100%; margin: 0px; padding: 0px;"></div>
        <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
        <script>
            var currentRoom;
            var globalHasCutscene = false;
            function loadThings() {
                $.getJSON("/player/room", function(data) {
                    if (currentRoom != data.room || globalHasCutscene) {
                        if (data.room == "startRoom") {
                            $("#intro").show()
                        } else {
                            $("#intro").hide()
                        }
                        $("html").css("background","url(/images/" + data.room + ".jpg) no-repeat center center fixed");
                        if (currentRoom != data.room) {
                            var audio = new Audio("/audio/" + data.room + ".wav");
                            audio.play();
                        }
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
                                if (roomData.search.found.picture) {
                                    globalHasCutscene = true;
                                }
                            } else {
                                $("#search").hide();
                            }
                            $.getJSON("/player/cutscene", function(cutsceneData) {
                                if (cutsceneData.hasCutscene == "true") {
                                    $("#cutscene").show()
                                    $("#cutscene img").attr("src","/images/" + roomData.search.found.picture);
                                    $.post("/player/cutscene", {"hasCutscene": "false"});
                                    setTimeout(function() {
                                        $("#cutscene").hide();
                                        $("#cutscene img").attr("src","");
                                    }, 8000);
                                }
                            });
                        });
                    }
                    currentRoom = data.room;
                });

                setTimeout(loadThings, 1000);
            }
            loadThings();
        </script>
    </body>
  </html>`;
  res.send(page);
});

module.exports = router;
