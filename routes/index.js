var express_graphql = require('express-graphql');
var { graphqlUploadExpress } = require('graphql-upload');
var authentication = require('./authentication');
var usersSchema = require('../schemas/users');

module.exports = function(app, passport) {

    // REST
    app.route('/api/v1/login')
      .post(passport.authenticate('local-login'), authentication.login)

    app.route('/api/v1/register')
      .post(passport.authenticate('local-signup'), authentication.register)

    app.route('/api/v1/isloggedin')
      .get(authentication.isLoggedIn)

    // Graphql
    app.route('/api/v2/graphql')
      .post(
          graphqlUploadExpress({
            maxFileSize: 10000000,
            maxFiles: 10
          }),
          express_graphql({
          schema: usersSchema.schema,
          rootValue: usersSchema.resolver,
          graphiql: false
        })
      )

}
