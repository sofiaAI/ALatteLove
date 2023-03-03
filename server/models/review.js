const mongoose = require("mongoose");

//define a story schema for the database
const ReviewSchema = new mongoose.Schema({
  creator_id: String,
  coffee_shop: String,
  drink: String,
  price: Number,
  wait_time: Number, 
  taste: Number, 
  vibes: Number, 
  location: Number, 
  internet: Number,
  notes: String,
});

// compile model from schema
module.exports = mongoose.model("review", ReviewSchema);