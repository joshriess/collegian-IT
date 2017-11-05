var express = require('express');
var router = express.Router();

var dir = express.static('audio');
router.use(dir);


module.exports = router;