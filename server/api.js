/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Review = require("./models/review");
const Comment = require("./models/comment");
// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|
router.get("/reviews", (req, res) => {
  // empty selector means get all documents
  Review.find({}).then((reviews) => res.send(reviews));
});

router.post("/review", auth.ensureLoggedIn, (req, res) => {
  console.log(req.body)
  const newReview = new Review({
    creator_id: req.user._id, 
    coffee_shop: req.body.coffee_shop,
    drink: req.body.drink,
    price: req.body.price,
    wait_time: req.body.wait_time, 
    taste: req.body.taste, 
    vibes: req.body.vibes, 
    location: req.body.location, 
    internet: req.body.internet,
    notes: req.body.notes,
  });

  newReview.save().then((review) => res.send(review));
});

router.get("/comment", (req, res) => {
  Comment.find({ parent: req.query.parent }).then((comments) => {
    res.send(comments);
  });
});

router.post("/comment", auth.ensureLoggedIn, (req, res) => {
  const newComment = new Comment({
    creator_id: req.user._id,
    creator_name: req.user.name,
    parent: req.body.parent,
    content: req.body.content,
  });

  newComment.save().then((comment) => res.send(comment));
});


// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
