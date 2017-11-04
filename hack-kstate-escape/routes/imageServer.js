var express = require('express');
var router = express.Router();

express.static('images');
router.use(express.static('images'));
router.use('/images', express.static('images'));

module.exports = router;