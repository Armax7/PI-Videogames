const videogamesHandler = require('./videogames_handler');
const genresHandler = require('./genres_handler');

module.exports = {
    getVideogameById:   videogamesHandler.getVideogameById,
    getVideogames:      videogamesHandler.getVideogames,
    postVideogame:      videogamesHandler.postVideogame,

    getAllGenres: genresHandler.getAllGenres,
}