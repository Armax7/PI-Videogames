const axios = require('axios');
const {Promise} = require('bluebird');
require('dotenv').config({path: '../../.env'});
const { api_key } = process.env;
const { Videogame, Genre} = require('../db');

const cleanApiInfo = function (info) {
    const response = info.map(elem => {
        return {
            id: elem.id,
            name: elem.name,
            released: elem.released,
            rating: elem.rating,
            platform: elem.platforms.map(element => element.platform.name).join(', '),
            genres: elem.genres.map(element => element.name).join(', '),
            created: false,
        }
    })
    return response;
}

const getApiInfo = async function () {

    const apiUrls = [axios.get(`https://api.rawg.io/api/games?key=${api_key}`).then(res => res.data.results)];

    for (let index = 2; index <= 5; index++) {
        apiUrls.push(axios.get(`https://api.rawg.io/api/games?key=${api_key}&page=${index}`)
            .then(res => res.data.results));
    }

    const apiInfo_raw = await Promise.all(apiUrls).then(res => res.flat());
    
    const apiInfo = cleanApiInfo(apiInfo_raw);
    
    console.log(apiInfo);
    return apiInfo;
}

const getDbInfo = async function () {
    return await Videogame.findAll({
        include: {
            model: Genre,
            attributes: ['name'],
            through: {
                attributes:[],
            }
        }
    })
}

const getAllInfo = async function () {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const allInfo = [...apiInfo, ...dbInfo];
    return allInfo;
}

const createGame = async function (req) {
    let {
        name,
        description,
        released,
        rating,
        platform,
        created,
        genre,
    } = req.body;

    let createdGame = await Videogame.create({
        name,
        description,
        released,
        rating,
        platform,
        created,
    });

    let genreDb = await Genre.findAll({
        where: { name: genre }
    });

    createdGame.addGenre(genreDb)
}

module.exports = {
    getApiInfo,
    getDbInfo,
    getAllInfo,
    createGame,
}