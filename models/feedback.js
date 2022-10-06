const mongoose = require("mongoose");
const Joi = require("joi");

const feedbackSchema = new mongoose.Schema({
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
        maxlength:100
    },
   
    confidence :{
         type:String,
         required: true,

    },
    
    image: { data: Buffer, contentType: String }
});

const Feedback =  mongoose.model("Feedback",feedbackSchema);


function validateFeedback(Feedback){

    const schema = {
        title: Joi.string().min(5).max(50),
        feedback:Joi.string().min(5).max(100),
        confidence: Joi.string(),


     };
 
     return result = Joi.validate(Feedback, schema);
}

module.exports.Feedback = Feedback;
module.exports.validateFeedback = validateFeedback;
module.exports.feedbackSchema = feedbackSchema;