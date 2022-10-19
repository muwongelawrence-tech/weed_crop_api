const validateObjectId = require("../middleware/validateObjectId");
const multer = require("multer");
const mongoose = require("mongoose");
const Joi = require("joi");
const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();

// working with an image
const imageSchema = mongoose.Schema({
  title : {
    type:String,
    required:true,
    minlength:5,
    maxlength:50
  },

  feedback : {
      type:String,
      required:true,
      minlength:5,
      maxlength:500
  },
 
  confidence :{
       type:String,
       required: true,

  },

  date: { type: Date , default: Date.now },

  image: {
    type: String
  },
});

const DetectionModel = mongoose.model('Detection', imageSchema);

function validatePost(post){

  const schema = {
      title: Joi.string().min(5).max(50),
      feedback:Joi.string().min(5).max(500),
      confidence: Joi.string(),


   };

   return result = Joi.validate(post, schema);
}


var storage = multer.diskStorage({      
  destination: function (req, file, cb) {        
  cb(null, 'public')      
  },   
       
  filename: function (req, file, cb) {        
  cb(null, new Date().toISOString() + file.originalname  
  )      
  }    
});

const upload = multer({
  storage: storage
});


//getting all posts
router.get("/", async (req, res) => {
  const uploads = await DetectionModel.find().sort({ date : -1 });
  res.send(uploads);
});

// posting the requests.
router.post('/', upload.single('image'), async(req, res, next) => {

  const { error } = validatePost(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const file = req.file   

  if (!file) {        
    console.log("file not picked ")
  }  
  else {

    const detection = new DetectionModel({ 
      title: req.body.title,
      feedback: req.body.feedback,
      confidence: req.body.confidence,         
      image: file.path        
    });

    const feedback = await detection.save();
    res.send(feedback);        
  

  }                  

}); 


module.exports = router;
