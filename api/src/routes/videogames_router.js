const { Router } = require('express');
const handlers = require('../handlers');

const videogamesRouter = Router();

videogamesRouter.get('/', handlers.getVideogames);
videogamesRouter.get('/:id', handlers.getVideogameById);

videogamesRouter.post('/', handlers.postVideogame);

module.exports = videogamesRouter;