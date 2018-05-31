const mongoose = require('mongoose');
const User = mongoose.model('User');
const { promisify } = require('es6-promisify');


exports.newUser = (req, res) => {
  res.render('authentication/register', {
    title: 'Register',
    bodyClass: 'page--register'
  })
};

exports.validateRegister = (req, res, next) => {
  req.sanitizeBody('first_name');
  req.checkBody('first_name', 'You must supply a first name!').notEmpty();
  req.sanitizeBody('last_name');
  req.checkBody('last_name', 'You must supply a last name!').notEmpty();
  req.checkBody('email', 'That email address is not valid!').isEmail();
  req.sanitizeBody('email').normalizeEmail({
    gmail_remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  });
  req.checkBody('password', 'Password Cannot be Blank!').notEmpty();
  req.checkBody('confirm_password', 'Confirmed Password cannot be blank!').notEmpty();
  req.checkBody('confirm_password', 'Oops! Your passwords do not match').equals(req.body.password);

  const errors = req.validationErrors();
  if (errors) {
    req.flash('error', errors.map(err => err.msg));
    res.render('register', { 
      title: 'Register',
      body: req.body,
      bodyClass: 'page--register',
      flashes: req.flash()
    });
    return;
  }
  next();
};

exports.register = async (req, res, next) => {
  const user = new User({ 
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name
  });
  const register = promisify(User.register.bind(User));
  await register(user, req.body.password);
  next();
};