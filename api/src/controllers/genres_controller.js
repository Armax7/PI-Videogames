const axios = require('axios');
const Promise = require('bluebird');
require('dotenv').config({path: '../../.env'});
const { api_key } = process.env;
const { Genre} = require('../db');

const getGenresFromApi = async function () {
    const genreUrl = await axios.get(`https://api.rawg.io/api/genres?key=${api_key}`);

    const apiGenres = [];
    genreUrl.data.results.forEach(genre => {
        apiGenres.push({id: genre.id ,name: genre.name});
    });

    return apiGenres;
}

const copyGenresFromApiToDb = async function () {
    try {
        const apiGenres = await getGenresFromApi();
        apiGenres.forEach(async (genre) => {
            await Genre.findOrCreate({
                where: {id: genre.id, name: genre.name}
            })
        })
        console.log('Database uploaded successfully');
    } catch (error) {
        console.log(error);
        return error;
    }
}

const getAllGenres = async function () {
    const allGenres = await Genre.findAll();

    return allGenres;
}

module.exports = {
    getGenresFromApi,
    getAllGenres,
    copyGenresFromApiToDb,
}