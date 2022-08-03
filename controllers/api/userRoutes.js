const router = require("express").Router();
const { User, Post } = require("../../models");

//Sign up
router.post("/signup", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.userId = userData.dataValues.id;
      req.session.userName = userData.dataValues.userName;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    if (err.errors && err.errors.length && err.errors[0].type === "unique violation") {
      res.status(400).json({ message: "Username already in use." });
    } else {
      console.log(err);
      res.status(500).json({ message: "Something went wrong." });
    }
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { userName: req.body.userName } });

    if (!userData) {
      res.status(400).json({ message: "Incorrect username or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect username or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.userId = userData.dataValues.id;
      req.session.userName = userData.dataValues.userName;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong." });
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
  res.json({ message: "You are now logged out" });
});

module.exports = router;
