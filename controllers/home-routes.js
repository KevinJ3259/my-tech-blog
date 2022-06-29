const router = require("express").Router();

// Registers the / route (when requested with the GET method)
router.get("/", (req, res) => {
  res.render("homepage", {
    blogPosts: [{}, {}, {}],
  });
});

module.exports = router;
