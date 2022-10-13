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

  if (req.files) {
    //  console.log(req.body);
    //  console.log(req.files.image.data);
    // res.send("image uploaded successfully");
  } else {
    console.log(
      "-----file not uploaded sucessfuly----------------------------"
    );
  }

  let feeback = new Feedback({
    title: req.body.title,
    feedback: req.body.feedback,
    confidence: req.body.confidence,
    image: {
      data: req.files.image.data,
      contentType: req.files.image.mimetype,
    },
  });
  //save feeback to the database
  feeback = await feeback.save();
  res.send(feeback);
});

module.exports = router;
