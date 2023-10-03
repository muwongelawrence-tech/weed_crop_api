const root = require("../routes/home");
const users = require("../routes/users");
const auth = require("../routes/auth");
const posts = require("../routes/posts");
const error = require("../middleware/error");
const express = require("express"); 


module.exports = function (app) {
  app.use(express.json());
  app.use(express.static("public"));
  app.use("/", root);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/posts", posts);
 
  // Logging error middleware in express..
  app.use(error);

};
