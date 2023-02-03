const videogamesController = require('./videogames_controller');
const genresController = require('./genres_controller');

module.exports = {
    getApiInfo:     videogamesController.getApiInfo,
    getDbInfo:      videogamesController.getDbInfo,
    getAllInfo:     videogamesController.getAllInfo,
    getGameByName:  videogamesController.getGameByName,
    getGameById:    videogamesController.getGameById,
    createGame:     videogamesController.createGame,
    
    getGenresFromApi:       genresController.getGenresFromApi,
    getAllGenres:           genresController.getAllGenres,
    copyGenresFromApiToDb:  genresController.copyGenresFromApiToDb,
}