const controllers = require('../controllers');

//GET game with query by name
const getVideogames = async function (req, res) {
    const {name} = req.query;

    try {
        if (!name) {
            const allGames = await controllers.getAllInfo();
            res.status(200).json(allGames);
        }
        else {
            const gameByName = await controllers.getGameByName(name);

            (!!gameByName) ? 
            res.status(200).json(gameByName) :
            res.status(404).json({message: 'The game you are looking for is not registered'});
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({error: error});
    }
}

//GET game by ID param
const getVideogameById = async function (req, res) {
    const {id} = req.params;

    try {
        const gameById = await controllers.getGameById(id);
        if (!!gameById) {
            res.status(200).json(gameById);
        }
        else {
            res.status(404).json({message: 'ID is not associated with any game'});
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({error});
    }
}

//POST game

const postVideogame = async function (req, res) {
    try {
        const response = await controllers.createGame(req.body);
        res.status(200).json({message: 'Game added successfully', response: response});
    } catch (error) {
        console.log(error);
        res.status(400).json({error: error});
    }
}

module.exports = {
    getVideogames,
    getVideogameById,
    postVideogame,
}