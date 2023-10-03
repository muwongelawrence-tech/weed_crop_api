const {  User , validateUser } = require("../models/user");
const _ = require("lodash");
const auth = require('../middleware/auth');
const bcrypt = require("bcrypt");
const express = require('express');
const router = express.Router();

// Getting the current user checknto see whether user is authorized
router.get('/me', auth , async (req ,res) => {
     const user = await  User.findById(req.user._id).select("-password"); 
     res.send(user);
});

router.post('/',async (req,res) => {
    const { error } = validateUser(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    let user = await User.findOne({email : req.body.email});
    if(user) return res.status(400).send("User already registered ..");

        user = new User(_.pick(req.body,["name","email","password"]));

         // encrypt the password sent by the user.
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password ,salt);
     
       //save user to the database
        await user.save();
        //get users token
        const token = user.generateAuthToken();
        
        res.header("x-auth-token",token).send(_.pick(user,["_id","name","email"]));
  });



module.exports = router;