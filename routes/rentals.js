const {  Rental ,  validateRental } = require("../models/rental");
const { Customer } = require("../models/customer");
const { Movie } = require("../models/movie");
const mongoose  = require("mongoose");
const Fawn = require("fawn");
const express = require('express');
const router = express.Router();

Fawn.init('mongodb://127.0.0.1:27017/vidly');

router.get('/',async (req,res) => {
  const rentals = await Rental.find().sort("-dateOut");
    res.send(rentals);
  });

//getting  agenre with a specific id
router.get('/:id',async (req,res) => {
  const rental = await Rental.findById(req.params.id);

    if(!rental) return res.status(404).send("The rental with this id doesnot exist in the database.");
    
    res.send(rental); 
  });

  
// posting requests or creating new resources

  router.post('/',async (req,res) => {
    //input validation using joi
    const { error } = validateRental(req.body);
       if(error) return res.status(400).send(error.details[0].message);
        
       const customer = await Customer.findById(req.body.customerId);
       if(!customer) return res.status(400).send("Invalid customer");

       const movie = await Movie.findById(req.body.movieId);
       if(!movie) return res.status(400).send("Invalid movie");

       if(movie.numberInStock === 0) return res.status(400).send("Movie not in Stock");

       let rental = new Rental({
         customer :{
             _id: customer._id,
             name: customer.name,
             phone: customer.phone
         },
         movie: {
             _id: movie._id,
             title: movie.title,
             dailyRentalRate : movie.dailyRentalRate
         } 
        });
        
       //save rental to the database
    // rental = await rental.save();
    //movie.numberInStock--;
    //movie.save();

    try{
        new Fawn.Task()
        .save('rentals',rental)
        .update('movies',{_id:movie._id },{
            $inc :{
                numberInStock : -1
            }
        })
        .run();

        res.send(rental);
    }
    catch(error){
        res.status(500).send("something failed..")
    }
    

    
  });

  // updating requests

  router.put('/:id', async (req,res) => {
     
    //vaidating
    const { error } = validateRental(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send("Invalid genre");

    const movie = await Rental.findByIdAndUpdate(req.params.id,{ 
      title :req.body.title,
      genre: {
        _id:genre._id,
        name:genre.name
      }, 
      numberInStock :req.body.numberInStock,
      dailyRentalRate : req.body.dailyRentalRate
    },
    {new:true});

  
    if(!movie) res.status(404).send("The movie with this id doesnot exist in the database.");
    
     res.send(movie);
  });


  // deleting a resource from the database

  router.delete('/:id',async (req,res) => {
    //find and delete a movie from the database
   const movie =  await Rental.findByIdAndRemove(req.params.id);
    if(!movie){
       res.status(404).send("The movie with this id doesnot exist in the database.");
    }
   
    res.send(movie);
  });

module.exports = router;