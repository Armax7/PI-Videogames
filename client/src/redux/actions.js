import axios from 'axios';

export const GET_VIDEOGAMES = 'GET_VIDEOGAMES';
export const GET_BY_NAME = 'GET_BY_NAME';
export const GET_BY_ID = 'GET_BY_ID';
export const GET_GENRES = 'GET_GENRES';
export const POST_VIDEOGAME = 'POST_VIDEOGAME';
export const FILTER_BY_GENRE = 'FILTER_BY_GENRE';
export const FILTER_BY_ORIGIN = 'FILTER_BY_ORIGIN';
export const FILTER_ALL_GAMES = 'FILTER_ALL_GAMES';
export const SORT_BY_NAME = 'FILTER_BY_NAME';
export const SORT_BY_RATING = 'SORT_BY_RATING';
export const RESET_VIDEOGAME_BY_NAME = 'RESET_VIDEOGAME_BY_NAME';
export const ERROR = 'ERROR';

export function getVideogames(){
    return async function (dispatch){
        const response = await axios.get('http://localhost:3001/videogames');
        return dispatch({type: GET_VIDEOGAMES, payload: response.data});
    }
}

export function getByName(name) {
    return async function (dispatch) {
        try {
            const response = await axios.get(`http://localhost:3001/videogames?name=${name}`);
            return dispatch({type: GET_BY_NAME, payload: response.data});
        } catch (error) {
            console.log(error.message);
            return dispatch({type: ERROR, payload: error.message})
        }
    }
}

export function getById(id) {
    return async function (dispatch) {
        const response = await axios.get(`http://localhost:3001/videogames/${id}`);
        return dispatch({type: GET_BY_ID, payload: response.data});
    }
}

export function getGenres(){
    return async function (dispatch) {
        const response = await axios.get('http://localhost:3001/genres');
        return dispatch({type: GET_GENRES, payload: response.data})
    }
}

export function postGames(payload){
    return async function (dispatch){
        const response = await axios.post('http://localhost:3001/videogames', payload)
        console.log(response)
        return response;
    }
}

export function filterGameByGenre (payload) {
    return {
        type: FILTER_BY_GENRE,
        payload,
    }
}

export function filterGameByOrigin(payload){
    return {
        type: FILTER_BY_ORIGIN,
        payload,
    }
}

export function filterAllGames () {
    return {
        type: FILTER_ALL_GAMES,
        payload: FILTER_ALL_GAMES,
    }
}

export function sortByName(payload){
    return {
        type: SORT_BY_NAME,
        payload,
    }
}

export function sortByRating(payload){
    return {
        type: SORT_BY_RATING,
        payload,
    }
}

export function showError (payload){
    return {
        type: ERROR,
        payload,
    }
}

export function resetError(){
    return {
        type: ERROR,
        payload: '',
    }
}

export function resetVideogameByName(){
    return {
        type: RESET_VIDEOGAME_BY_NAME,
        payload: {},
    }
}