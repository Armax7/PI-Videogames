const { Router } = require('express');
const videogamesRouter = require('./videogames_router');
const genresRouter = require('./genres_router');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const mainRouter = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
mainRouter.use('/videogames', videogamesRouter);
mainRouter.use('/genres', genresRouter);

module.exports = mainRouter;
