/****************************** EXAMPLE ***************************************
*
* v1.route(/test)
* .post(checkPermissions({object: 'user', operation: 'create'}, passport, 'jwt', {session: false}), createUser);
*
******************************************************************************/

export const checkPermissions = (roles, passport, strategy, opts) => {

  return (req, res, next) => {

    passport.authenticate(strategy, opts, (err, user, info) => {

      if (err) {

        res.send(401);

      } else if (!user) {

        res.send(401);

      } else { // handle permissions

        // here goes the logic, check and compare permissions from `roles` and `req.user`
        next();

      }

    })(req, res, next)

  }

}
