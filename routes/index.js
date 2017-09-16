var authentication = require('./authentication');

module.exports = function(app) {

    app.route('/api/v1/login')
      .get(authentication.login)

}
