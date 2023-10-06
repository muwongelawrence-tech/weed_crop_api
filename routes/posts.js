require("dotenv").config();
const { S3Client } = require("@aws-sdk/client-s3");
const multer = require("multer");
const multerS3 = require("multer-s3");
const shortId = require("shortid");
const validateObjectId = require("../middleware/validateObjectId");
const { Feedback, validateFeedback } = require("../models/feedback");
const express = require("express");
const router = express.Router();


// configuration for the new aws package @aws-sdk/client-s3
const s3 = new S3Client({
  region: process.env.S3_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRETACCESS_KEY,
  },
});

// uploading images to the aws bucket -- faster process highly recommended.
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "radiographyvideoupload",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, `weed_crop_detections/${shortId.generate()}-${file.originalname}`);
    },
  }),
});

// Getting all posts....
router.get("/", async (req, res) => {
  const posts = await Feedback.find();
  res.send(posts);
});

// Getting  a post  with a specific id
router.get("/:id", validateObjectId, async (req, res) => {
  const post = await Feedback.findById(req.params.id);

  if (!post)
    return res
      .status(404)
      .send("The post with this id doesnot exist in the database.");

  res.send(post);
});

// Posting requests..
router.post("/", upload.fields([
  { name: 'image', maxCount: 1 },
]), async (req, res) => {
  // input validation using joi......
  const { error } = validateFeedback(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const detection = req.files['image'][0].location;

  if (!detection) {

  } else {
    res.send("No file is  picked...");
  }

  let feeback = new Feedback({
    title: req.body.title,
    feedback: req.body.feedback,
    confidence: req.body.confidence,
    image: detection,
  });

  // Save feeback to the database...
  feeback = await feeback.save();
  res.send(feeback);
});

module.exports = router;
