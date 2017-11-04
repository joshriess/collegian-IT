var express = require('express');
var router = express.Router();

express.static('Images');
router.use(express.static('Images'));
router.use('/Images', express.static('Images'));

module.exports = router;