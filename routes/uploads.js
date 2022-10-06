//const validateObjectId = require("../middleware/validateObjectId");
// const multer = require("multer");
// const mongoose = require("mongoose");
// const fs = require("fs");
// const path = require("path");
const express = require("express");
const router = express.Router();



// // working with an image
// const imageSchema = mongoose.Schema({
//   image: { data: Buffer, contentType: String },
// }, { timestamps: true });

// const ImageModel = mongoose.model('Image', imageSchema);

// let storage = multer.memoryStorage();

// const upload = multer({ storage: storage , limits: { fileSize: 2000000 } });



router.get("/", (req, res) => {

    res.send([1,2,3]);
});

// image upload using multer
// router.post("/", upload.single("image"), async (req, res) => {

// const image = {
//     data: new Buffer.from(req.file.buffer, "base64"),
//     contentType: req.file.mimetype,
// };

// const savedImage = await ImageModel.create(image);
// res.send(savedImage);

// });


router.post("/", (req, res) => {
  
  console.log(" --------------route handler for the image upload-------------");

 if(req.files) {
  
  console.log(req.files);
  
  res.send("image uploaded successfully");
}
else{
  console.log("-----file not uploaded sucessfuly----------------------------");
}
 
  
});



module.exports = router;