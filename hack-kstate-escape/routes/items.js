var express = require('express');
var router = express.Router();

/* GET items listing. */
router.get('/', function(req, res, next) {

    // Define the items here


    // Send the results
  res.send('respond with a resource');
});

module.exports = router;
