
const mongoose = require("mongoose");
const Joi = require("joi");

const customerSchema = new mongoose.Schema({
    name : {
      type:String,
      required:true,
      minlength:5,
      maxlength:50
    },
    isGold:{
        type:Boolean,
        default:false
    },
    phone : {
      type:String,
      required:true,
      minlength:5,
      maxlength:50
    },
  });
  
  const Customer =  mongoose.model("Customer",customerSchema);


function validateCustomer(customer){
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(50).required(),
        isGold: Joi.boolean()
     };
 
     return result = Joi.validate(customer, schema);
}

module.exports.Customer = Customer;
module.exports.validateCustomer = validateCustomer;