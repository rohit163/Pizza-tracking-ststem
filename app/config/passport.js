const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const init = (passport) => {
  passport.use(
    new LocalStrategy(
      /*to set custom username field default is username*/ {
        usernameField: "email",
      },
      async (email, password, done) => {
        //Login Logic
        const user = await User.findOne({ email: email });
        if (!user) {
          return done(null, false, { message: "No User With This Email" });
        }
        bcrypt
          .compare(password, user.password)
          .then((match) => {
            if (match) {
              return done(null, user, { message: "Logged In SuccesFully" });
            }
            return done(null, false, {
              message: "Wrong username and Password",
            });
          })
          .catch((err) => {
            return done(null, false, { message: "Something went Wrong" });
          });
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser((id, done) => {
    User.findOne({ _id: id }, (err, user) => {
      done(err, user);
    });
  });
};

module.exports = init;
