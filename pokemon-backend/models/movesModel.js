const mongoose = require("mongoose");

const dblink =
  "mongodb+srv://Strange007:CGPcJe8SeHIFj9jI@cluster0.elmuzpg.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(dblink)
  .then(() => {
    console.log("moves DB connected.");
  })
  .catch((err) => {
    console.log("Error", err);
  });

const movesSchema = mongoose.Schema({
    Id : {
        type : Number,
        required : true,
        unique : true
    },
    Pokemon : {
        type : Array,
        required : true,
    },
    Name : {
        type : String,
        required : true,
        unique : true 
    },
    Type : {
        type : String,
        required : true
    },
    Category : {
        type : String,
        required : true
    },
    Power : {
        type : String,
        required : true
    },
    Accuracy : {
        type : String,
        required : true 
    },
    Effect : {
        type : String,
    },
    TM : {
        type : String
    },
    PP : {
        type : String,
        required : true
    },
    Prob : {
        type : String,
    }
})

const movesModel = mongoose.model('movesSchema',movesSchema)

module.exports = movesModel 
