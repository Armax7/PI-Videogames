const axios = require('axios');
const {Promise} = require('bluebird');
require('dotenv').config(/* {path: '../../.env'} */);
const { api_key } = process.env;
const { Videogame, Genre} = require('../db');
const { myIsObject } = require('../utils')

const cleanApiInfo = function (info) {
    if (Array.isArray(info)){
        const response = info.map(elem => {
            return {
                id: elem.id,
                name: elem.name,
                description: !elem.description_raw ? 'No description' : elem.description_raw,
                released: elem.released,
                background_image: elem.background_image,
                rating: elem.rating,
                platforms: elem.platforms.map(element => element.platform.name).join(', '),
                genres: elem.genres.map(element => {return {id: element.id, name: element.name}}),
                created: false,
            }
        })
        return response;
    }

    return {
        id: info.id,
        name: info.name,
        description: !info.description_raw ? 'No description' : info.description_raw,
        released: info.released,
        background_image: info.background_image,
        rating: info.rating,
        platforms: info.platforms.map(element => element.platform.name).join(', '),
        genres: info.genres.map(element => {return {id: element.id, name: element.name}}),
        created: false,
    }
}

const getApiInfo = async function () {

    const apiUrls = [axios.get(`https://api.rawg.io/api/games?key=${api_key}`).then(res => res.data.results)];

    for (let index = 2; index <= 5; index++) {
        apiUrls.push(axios.get(`https://api.rawg.io/api/games?key=${api_key}&page=${index}`)
            .then(res => res.data.results));
    }

    const apiInfo_raw = await Promise.all(apiUrls).then(res => res.flat());
    
    const apiInfo = cleanApiInfo(apiInfo_raw);
    
    return apiInfo;
}

const getDbInfo = async function () {
    return await Videogame.findAll({
        include: {
            model: Genre,
            attributes: ['id', 'name'],
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

const getGameById = async function (id) {
    try {
        const apiUrl = await axios.get(`https://api.rawg.io/api/games/${id}?key=${api_key}`)
        const gameById = cleanApiInfo(apiUrl.data);
        
        return gameById;
    } catch (error) {
        console.log("API Error:",error.response.status, error.response.statusText)
    }
    const dbInfo = await getDbInfo();
    const filteredDbInfo = dbInfo.filter(elem => elem.id === id);
    const gameById = filteredDbInfo.at(0).dataValues;
    console.log(gameById)

    return gameById;
}

const getGameByName = async function (name) {
    const allInfo = await getAllInfo();
    const gameByName = allInfo.filter(game => game.name.toString().toLowerCase() === name.toString().toLowerCase());
    const gameWithDetails = await getGameById(gameByName.at(0).id);

    return gameWithDetails;
}

const createGame = async function (body) {
    let {
        name,
        description,
        released,
        rating,
        platforms,
        created,
        genres,
    } = body;
    
    let createdGame = await Videogame.create({
        name,
        description,
        released,
        rating,
        platforms,
        created,
    });

    if(Array.isArray(genres) && myIsObject(genres.at(0))){
        genres.forEach(async (genre) => {
            let genreDb = await Genre.findAll({
                where: { name: genre.name }
            });
        
            await createdGame.addGenre(genreDb);
            
            return createdGame;
        })
    }
    else if (Array.isArray(genres)) {
        genres.forEach(async (genre) => {
            let genreDb = await Genre.findAll({
                where: { name: genre }
            });
        
            await createdGame.addGenre(genreDb);
            
            return createdGame;
        })
    }
    else{
        let genreDb = await Genre.findAll({
            where: { name: genres }
        });
    
        await createdGame.addGenre(genreDb);
        
        return createdGame;
    }

}

module.exports = {
    getApiInfo,
    getDbInfo,
    getAllInfo,
    getGameByName,
    getGameById,
    createGame,
}