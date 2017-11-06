var authentication = require('./authentication');

module.exports = function(app, passport) {

    app.route('/api/v1/login')
      .post(passport.authenticate('local-login'), authentication.login)

    app.route('/api/v1/register')
      .post(passport.authenticate('local-signup'), authentication.register)

    app.route('/api/v1/isloggedin')
      .get(authentication.isLoggedIn)

}
