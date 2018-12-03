import User from '../models/user';
import {
  Strategy as LocalStrategy
} from 'passport-local';
import {
  Strategy as JwtStrategy
} from 'passport-jwt';
import {
  ExtractJwt
} from 'passport-jwt';

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'super secret jwt secret';
opts.passReqToCallback = true;

export default function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  // LOCAL Strategy
  passport.use('local-signup', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    function(req, email, password, done) {
      process.nextTick(function() {
        User.findOne({
          'email': email
        }, function(err, user) {
          if (err)
            return done(err);
          if (user) {
            return done(null, false);
          } else {
            let newUser = new User();
            newUser.email = email;
            newUser.password = newUser.generateHash(password);
            newUser.save(function(err) {
              if (err)
                throw err;
              return done(null, newUser);
            });
          }
        });
      });
    }
  ));

  passport.use('local-login', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    function(req, email, password, done) {
      User.findOne({
        'email': email
      }, function(err, user) {
        if (err)
          return done(err);
        if (!user)
          return done(null, false);
        if (!user.validPassword(password))
          return done(null, false);
        return done(null, user);
      });

    }
  ));

  // JWT strategy
  passport.use('jwt', new JwtStrategy(opts, function(req, jwt_payload, done) {
    User.findOne({
      _id: jwt_payload.id
    }, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (user) {
        req.user = user;
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  }));


}
