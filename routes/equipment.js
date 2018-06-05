const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('equipment/index', {
        title: 'My Equipment'
    });
});

module.exports = router;
