var express = require('express');
var router = express.Router();

const { catchErrors } = require('../handlers/errorHandlers');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');


/* GET login page. */
router.get('/',
    userController.newUser
);

router.post('/', 
    // userController.validateRegister,
    catchErrors(userController.register),
    authController.login
);

router.get('/equipment', function(req, res, next) {
    res.render('authentication/registerEquipment', { 
        title: 'Register',
        bodyClass: 'page--register'
    });
});

module.exports = router;
