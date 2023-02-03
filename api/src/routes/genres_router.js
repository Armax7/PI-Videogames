const { Router } = require('express');
const handlers = require('../handlers');

const genresRouter = Router();

genresRouter.get('/', handlers.getAllGenres);

module.exports = genresRouter;