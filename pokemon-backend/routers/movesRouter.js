const express = require('express');
const { getAllMoves, addMoves, moveDetails, pokemonMoves } = require('../controllers/movesController');
const movesRouter = express.Router();

movesRouter.route('/all')
    .get(getAllMoves)

movesRouter.route('/')
    .post(addMoves)

movesRouter.route('/pokemon/:name')
    .get(pokemonMoves)

movesRouter.route('/:name')
    .get(moveDetails)

module.exports=movesRouter