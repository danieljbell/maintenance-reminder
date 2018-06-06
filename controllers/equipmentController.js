const mongoose = require('mongoose');

exports.listEquipment = (req, res) => {
  if (req.user.first_name = 'Noah') {
    res.render('equipment/add', {
      title: 'Add New Equipment'
    });
  } else {
    res.render('equipment/index', {
      title: 'My Equipment'
    });
  }
};