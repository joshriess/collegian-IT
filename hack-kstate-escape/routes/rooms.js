var express = require('express');
var router = express.Router();

/* GET rooms listing. */
router.get('/', function(req, res, next) {

    // Define the rooms here


    // Send the results
  res.send('respond with a resource');
});

module.exports = router;
