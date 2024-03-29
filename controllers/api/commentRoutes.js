const router = require("express").Router();
const { Comment, Post, User } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      //   include: [
      // {
      //     model: User,
      //     attributes: ["userName", "id"]
      // },
      // {
      //     model: Post,
      //     attribues: ["id"]
      // }
      // ],
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post(
  "/",
  /*withAuth,*/ async (req, res) => {
    try {
      const newComment = await Comment.create({
        content: req.body.content,
        post_id: req.body.post_id,
        user_id: req.session.userId,
      });

      res.status(200).json(newComment);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }
);

router.put("/:id", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: "No comment found with this id!" });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        // user_id: req.session.userId,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: "No comment found with this id!" });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
