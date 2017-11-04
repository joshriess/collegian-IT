var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var page = "<html><head><title>Escape Hack K-State</title></head><body style='width: 100%; height: 100%; padding: 0; margin: 0;'>";

  page += "<img id='currentRoom' src='' style='width: 100%; height: 100%'>";

  page += `<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
  <script>
    $.getJSON("/player/room", function(data) {
        $("#currentRoom").attr("src","/images/" + data.room + ".jpg");
    });
  </script>`;

  page += "</body></html>";
  res.send(page);
});

module.exports = router;
