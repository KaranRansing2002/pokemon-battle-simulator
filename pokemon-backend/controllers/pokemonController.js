const pokemonModel = require("../models/pokemonModel");

async function addPokemon (req, res) {
    try {
      const data = req.body;
      const pokemon = await pokemonModel.create(data);
      res.json({
        message: pokemon,
      });
      const id = await pokemonModel.find({'id' : 0});
      // console.log(id);
    } catch (err) {
      console.log(err);
    }
}
 
async function getAllPokemons (req, res) {
    try {
      const data = await pokemonModel.find();
      res.json(data)
    } catch (error) {
      console.log(error)
    }
} 

async function findPokemon (req,res) {
    try {
      const {name}=req.params
      const data = await pokemonModel.findOne({ name: name })
      if (!data || data === []) {
        return res.status(404).send('No pokemon found')
      }
      res.json(data)
    } catch (error) {
      console.log("error",error)
    }
}

module.exports = {
    addPokemon,
    findPokemon,
    getAllPokemons
}
