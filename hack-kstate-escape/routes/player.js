var express = require('express');
var router = express.Router();

/* GET player info. */
router.get('/', function(req, res, next) {

    // Define the player info here


    // Send the results
  res.send('respond with a resource');
});

module.exports = router;
