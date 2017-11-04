var express = require('express');
var router = express.Router();

var dir = express.static('images');
router.use(dir);


module.exports = router;