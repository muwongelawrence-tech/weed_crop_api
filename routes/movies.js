const {  Movie , validateMovie } = require("../models/movie");
const express = require('express');
const { Genre } = require("../models/genre");
const router = express.Router();

router.get('/',async (req,res) => {
  const movies = await Movie.find().sort("name");
    res.send(movies);
  });

//getting  agenre with a specific id
router.get('/:id',async (req,res) => {
  const movie = await Movie.findById(req.params.id);

    if(!movie) return res.status(404).send("The movie with this id doesnot exist in the database.");
    
    res.send(movie); 
  });

  
// posting requests or creating new resources

  router.post('/',async (req,res) => {
    //input validation using joi
    const { error } = validateMovie(req.body);
       if(error) return res.status(400).send(error.details[0].message);
        
       const genre = await Genre.findById(req.body.genreId);
       if(!genre) return res.status(400).send("Invalid genre");

       let movie = new Movie({
         title : req.body.title,
         genre: {
           _id:genre._id,
           name:genre.name
         }, 
         numberInStock :req.body.numberInStock,
         dailyRentalRate : req.body.dailyRentalRate
        });
        
       //save movie to the database
       movie = await movie.save();
      res.send(movie);
  });

  // updating requests

  router.put('/:id', async (req,res) => {
     
    //vaidating
    const { error } = validateMovie(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send("Invalid genre");

    const movie = await Movie.findByIdAndUpdate(req.params.id,{ 
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
   const movie =  await Movie.findByIdAndRemove(req.params.id);
    if(!movie){
       res.status(404).send("The movie with this id doesnot exist in the database.");
    }
   
    res.send(movie);
  });

module.exports = router;