var express = require('express');
var router = express.Router();

var dir = express.static('images', {
  maxage: '48h'
});
router.use(dir);


module.exports = router;
