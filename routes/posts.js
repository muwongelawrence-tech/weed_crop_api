const validateObjectId = require("../middleware/validateObjectId");
const { Feedback, validateFeedback } = require("../models/feedback");
const express = require("express");
const router = express.Router();

//getting all posts
router.get("/", async (req, res) => {
  const posts = await Feedback.find();
  res.send(posts);
});

//getting  a post  with a specific id
router.get("/:id", validateObjectId, async (req, res) => {
  const post = await Feedback.findById(req.params.id);

  if (!post)
    return res
      .status(404)
      .send("The post with this id doesnot exist in the database.");

  res.send(post);
});

// posting requests or creating new resources

router.post("/", async (req, res) => {
  //input validation using joi
  const { error } = validateFeedback(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let post = new Feedback({
    title: req.body.title,
    feedback: req.body.feedback,
    confidence: req.body.confidence,
    image: {
      data:req.body.data,
      contentType: req.body.mimetype
     }
  });
  //save post to the database
  post = await post.save();
  res.send(post);
  
});

module.exports = router;
