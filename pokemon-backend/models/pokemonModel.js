const express = require("express");
const mongoose = require("mongoose");

const dblink =
  "mongodb+srv://Strange007:CGPcJe8SeHIFj9jI@cluster0.elmuzpg.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(dblink)
  .then(() => {
    console.log("pokemon DB connected.");
  })
  .catch((err) => {
    console.log("Error", err);
  }); 

const pokemonSchema = mongoose.Schema({
  id: {
    type: Number,
    required : true,
    unique : true
  }, 
  imageUrl: {
  type: String,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  types: {
    type: Array,
    required: true,
  },
  abilities: {
    type: Array, 
    required: true,
  },
  stats: {
    type: Array,
    required: true,
  },
});

const pokemonModel = mongoose.model("pokemonSchema", pokemonSchema);

module.exports = pokemonModel;
