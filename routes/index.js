const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET login page. */
router.get('/login', function(req, res, next) {
    res.render('authentication/login', { 
        title: 'Login',
        bodyClass: 'page--login'
    });
});

router.post('/login',
    authController.login
);

/* GET home page. */
router.get('/logout', authController.logout);

module.exports = router;
