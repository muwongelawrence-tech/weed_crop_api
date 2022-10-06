const root = require("../routes/home");
const customers = require("../routes/customers");
const genres = require("../routes/genres");
const movies = require("../routes/movies");
const rentals = require("../routes/rentals");
const users = require("../routes/users");
const auth = require("../routes/auth");
const returns = require("../routes/returns");
const posts = require("../routes/posts");
const uploads = require("../routes/uploads");
const error = require("../middleware/error");
const express = require("express"); 
const imageupload = require("express-fileupload");
const formidable = require("express-formidable");

module.exports = function (app) {
  app.use(express.json());
  app.use(express.static("public"));
//app.use(express.urlencoded({ extended: true }));
  app.use("/", root);
  app.use("/api/genres", genres);
  app.use("/api/customers", customers);
  app.use("/api/movies", movies);
  app.use("/api/rentals", rentals);
  app.use("/api/users", users);
  app.use("/api/returns", returns);
  app.use("/api/auth", auth);
  app.use("/api/posts", posts);
  app.use(formidable());
  app.use(imageupload());
  app.use("/api/uploads", uploads);
  //logging error middleware in express
   app.use(error);


};
