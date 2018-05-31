const passport = require('passport');

// exports.checkAuth = (req, res, next) => {
//   if (req.isAuthenticated()) {
//     next();
//   } else {
//     res.redirect('/login');
//   }
// };

// exports.loginScreen = (req, res) => {
//   if (!req.isAuthenticated()) {
//     res.render('login', {
//       title: 'Login!',
//       bodyClass: 'login-screen'
//     });
//   } else {
//     res.redirect('/');
//   }
// };

exports.login = passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: 'Login failed, please try again',
  successRedirect: '/equipment',
  successFlash: 'You are now logged in!'
});

exports.logout = (req, res) => {
  req.logout();
  req.flash('success', 'You successfully logged out');
  res.redirect('/');
};