const express = require('express');
const router = express.Router();

const { catchErrors } = require('../handlers/errorHandlers');
const authController = require('../controllers/authController');
const equipmentController = require('../controllers/equipmentController');

/* GET home page. */
router.get('/', 
  equipmentController.listEquipment
);

router.get('/add', function(req, res, next) {
  res.render('equipment/add', {
        title: 'Add New Equipment'
    });
});

router.get('/edit/:id', function(req, res, next) {
  res.render('equipment/edit', {
        title: 'Edit Equipment'
    });
});

module.exports = router;
