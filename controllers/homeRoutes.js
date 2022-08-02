const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["userName"],
        },
        {
          model: Comment,
          attributes: ["content", "post_id", "date_created"],
          include: [
            {
              model: User,
              attributes: ["userName"],
            },
          ],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    const commentData = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ["userName"],
        },
      ],
    });
    const comments = commentData.map((comment) => comment.get({ plain: true }));

    res.render("homepage", {
      logged_in: req.session.logged_in,
      posts,
      comments,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login", {
    logged_in: req.session.logged_in,
  });
});

router.get("/dashboard", async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.userId, {
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });
    res.render("dashboard", {
      user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/posts/:id", async (req, res) => {
  try {
    const postData = await Post.findOne({
      include: [
        {
          model: User,
          attributes: ["userName", "id"],
        },
      ],
      where: {
        id: req.params.id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }
    const post = postData.get({ plain: true });

    const userData = await User.findByPk(req.session.userId, {
      include: [{ model: Post }],
    });

    const user = userData ? userData.get({ plain: true }) : null;

    res.render("post", {
      user,
      logged_in: req.session.logged_in,
      post,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
