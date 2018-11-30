import express from 'express';
import express_graphql from 'express-graphql';
import { graphqlUploadExpress } from 'graphql-upload';

import * as authentication from './authentication';
import * as usersSchema from '../schemas/users';

const v1 = express.Router();
const v2 = express.Router();

export default function(app, passport) {

    // REST
    v1.route('/login')
    /**
     * @api {POST} /api/v1/login Sign in
     * @apiName Login
     * @apiGroup Authentication
     * @apiPermission none
     *
     * @apiParam {String} email Email address
     * @apiParam {String} password Password
     *
     * @apiSuccess (200) {String} token JWT
     * @apiError (401)
     */
      .post(passport.authenticate('local-login'), authentication.login)

    v1.route('/register')
      .post(passport.authenticate('local-signup'), authentication.register)

    v1.route('/isloggedin')
      .get(authentication.isLoggedIn)

    // Graphql
    v2.route('/graphql')
      .post(
          graphqlUploadExpress({
            maxFileSize: 10000000,
            maxFiles: 10
          }),
          express_graphql({
          schema: usersSchema.default.schema,
          rootValue: usersSchema.default.resolver,
          graphiql: false
        })
      )

    app.use('/api/v1', v1);
    app.use('/api/v2', v2)

}
