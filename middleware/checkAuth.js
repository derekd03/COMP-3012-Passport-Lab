module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/auth/login");
  },
  forwardAuthenticated: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    else {
      res.redirect("/dashboard");
    }
  },
  // student-added isAdmin middleware
  isAdmin(req, res, next) {
    // if user is authenticated and is an admin
    // move on to rendering the admin dashboard
    if (req.isAuthenticated() && req.user.isAdmin) {
      return next();
    }
    res.redirect("/auth/login");
  }
};
