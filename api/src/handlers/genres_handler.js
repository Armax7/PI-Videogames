const controllers = require('../controllers');

//GET genres
const getAllGenres = async function (req, res) {
    try {
        const allGenres = await controllers.getAllGenres();
        res.status(200).json(allGenres);
    } catch (error) {
        console.log(error);
        res.status(400).json({error: error});
    }
}

module.exports = {
    getAllGenres,
}