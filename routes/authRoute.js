const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated, isAdmin } = require("../middleware/checkAuth");

const router = express.Router();

router.get('/github',
  passport.authenticate('github'));

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

router.get("/login", forwardAuthenticated, (req, res) => res.render("login"));

// student-added admin authentication route
router.get("/admin", isAdmin, (req, res) => res.render("admin"));

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/admin",
    failureRedirect: "/auth/login",
  }),
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/auth/login");
});

// student-added session revoke function ***non-functioning***
router.get("/revoke", isAdmin, (req, res) => {

  const sessionId = req.query.id;
  req.sessionStore.destroy(sessionId, (err) => {
    res.redirect("/dashboard");
  });
  // let sessionDestroyed = false;

  // // find session with matching id
  // req.sessionStore.all((err, sessions) => {
  //   Object.values(sessions).forEach((session) => {
  //     if (session.passport && session.passport.user === userId) {
  //       req.sessionStore.destroy(session.id);
  //       sessionDestroyed = true;
  //     }
  //   });

  // check whether session was destroyed

});
// });

module.exports = router;
