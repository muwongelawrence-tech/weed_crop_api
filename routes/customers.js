const {Customer ,validateCustomer} = require("../models/customer");
const express = require('express');
const router = express.Router();


router.get('/',async (req,res) => {
  const customers = await Customer.find().sort("name");
    res.send(customers);
  });

//getting  customer  with a specific id
router.get('/:id',async (req,res) => {
  const customer = await Customer.findById(req.params.id);

    if(!customer) return res.status(404).send("The customer with this id doesnot exist in the database.");
    
    res.send(customer); 
  });

  
// posting requests or creating new resources

  router.post('/',async (req,res) => {
    //input validation using joi
    const { error } = validateCustomer(req.body);
       if(error) return res.status(400).send(error.details[0].message);
       
       let customer = new Customer({
           name : req.body.name,
           phone : req.body.phone,
           isGold : req.body.isGold
         });
        
       //save customer to the database
       customer = await customer.save();
      res.send(customer);
  });

  // updating requests

  router.put('/:id', async (req,res) => {
     
    //validating
    const { error } = validateCustomer(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id,
        { 
            name :req.body.name,
            phone:req.body.phone,
            isGold:req.body.isGold
        },

        {new:true}
    );

  
    if(!customer) res.status(404).send("The customer with this id doesnot exist in the database.");
    
     res.send(customer);
  });


  // deleting a customer from the database

  router.delete('/:id',async (req,res) => {
    //find and delete a customer from the database
   const customer =  await Customer.findByIdAndRemove(req.params.id);
    if(!customer){
       res.status(404).send("The customer with this id doesnot exist in the database.");
    }
   
    res.send(customer);
  });





module.exports = router;