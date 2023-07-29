const express = require('express');
const { getAllPokemons, addPokemon, findPokemon } = require('../controllers/pokemonController');
const pokemonRouter = express.Router();


pokemonRouter.route('/all')
    .get(getAllPokemons)

pokemonRouter.route('/')
    .post(addPokemon)

pokemonRouter.route('/:name') 
    .get(findPokemon)

module.exports = pokemonRouter