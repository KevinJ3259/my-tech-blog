const router = require("express").Router();
const { Post, User } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["userName", "id"],
        },
      ],
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      comment_id: req.body.comment_id,
      user_id: req.session.userId,
    });

    res.status(200).json(newPost);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.get(
  "/:id",
  /*withAuth,*/ async (req, res) => {
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

      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

router.put(
  "/:id",
  /*withAuth,*/ async (req, res) => {
    try {
      const postData = await Post.update(req.body, {
        where: {
          id: req.params.id,
        },
      });

      if (!postData) {
        res.status(404).json({ message: "No post found with this id!" });
        return;
      }

      res.status(200).json(postData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
);

router.delete(
  "/:id",
  /*withAuth,*/ async (req, res) => {
    try {
      const postData = await Post.destroy({
        where: {
          id: req.params.id,
          // user_id: req.session.userId,
        },
      });

      if (!postData) {
        res.status(404).json({ message: "No post found with this id!" });
        return;
      }

      res.status(200).json(postData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
);

module.exports = router;
