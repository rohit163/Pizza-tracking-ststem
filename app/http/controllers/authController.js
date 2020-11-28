const User = require("../../models/User");
const passport = require("passport");

const authController = () => {
  const _getRedirectUrl = (req) => {
    return req.user.role === "admin" ? "/admin/orders" : "/";
  };

  return {
    login: (req, res) => {
      res.render("auth/login");
    },
    postLogin: (req, res, next) => {
      const { email, password } = req.body;
      //validating Request
      if (!email || !password) {
        req.flash("error", "All Fields Are Required");
        req.flash("email", email);
        return res.redirect("/login");
      }
      passport.authenticate("local", (err, user, info) => {
        if (err) {
          req.flash("error", info.message);
          return next(err);
        }
        if (!user) {
          req.flash("error", info.message);
          return res.redirect("/login");
        }
        req.logIn(user, (err) => {
          if (err) {
            req.flash("error", info.message);
            return next(err);
          }
          return res.redirect(_getRedirectUrl(req));
        });
      })(req, res, next);
    },
    register: (req, res) => {
      res.render("auth/register");
    },
    postRegister: async (req, res) => {
      try {
        const { name, email, password } = req.body;
        //validating Request
        if (!name || !email || !password) {
          req.flash("error", "All Fields Are Required");
          req.flash("name", name);
          req.flash("email", email);
          return res.redirect("/register");
        }
        //Check if Email Exist
        await User.exists({ email }, (err, result) => {
          if (result) {
            req.flash("error", "Email Already Taken");
            req.flash("name", name);
            req.flash("email", email);
            return res.redirect("/register");
          }
        });
        //Creating User
        const user = new User({ name, email, password });
        await user.save();

        return res.redirect("/");
      } catch (error) {
        req.flash("error", "SomeThing went Wrong");
        return res.redirect("/register");
      }
    },
    logout(req, res) {
      req.logout();
      return res.redirect("/");
    },
  };
};

module.exports = authController;
