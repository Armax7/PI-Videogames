import * as Actions from './actions';
import * as Constant from '../constants';
import * as Utils from '../utils';

const initialState = {
    videogame_list: [],
    videogamesByGenre: [],
    videogamesByOrigin: [],
    allVideogames: [],
    videogame: {name: undefined},
    genre_list:[],
    error: '',
}


export default function rootReducer (state = initialState, action) {
    switch(action.type) {
        case Actions.GET_VIDEOGAMES:
            const initialRes = action.payload;
            return {
                ...state,
                videogame_list: initialRes.sort((a,b)=>(Utils.mySortAscendingComparingFunc(a.name,b.name))),
                videogamesByGenre: initialRes.sort((a,b)=>(Utils.mySortAscendingComparingFunc(a.name,b.name))),
                videogamesByOrigin: initialRes.sort((a,b)=>(Utils.mySortAscendingComparingFunc(a.name,b.name))),
                allVideogames: initialRes.sort((a,b)=>(Utils.mySortAscendingComparingFunc(a.name,b.name))),
            }

        case Actions.GET_BY_NAME:
            return {
                ...state,
                videogame: action.payload,
            }

        case Actions.GET_BY_ID:
            return {
                ...state,
                videogame: action.payload,
            }

        case Actions.GET_GENRES:
            return {
                ...state,
                genre_list: action.payload,
            }

        case Actions.POST_VIDEOGAME:
            return {
                ...state,
            }

        case Actions.FILTER_BY_GENRE:
            let filteredByGenre = state.videogamesByOrigin;
            let allByGenre =  state.allVideogames;
            if(action.payload !== Constant.ALL){
                allByGenre = allByGenre.filter(elem => elem.genres.some(el => el.name === action.payload));
                filteredByGenre = filteredByGenre.filter(elem => elem.genres.some(el => el.name === action.payload));
            }
            return {
                ...state,
                videogame_list: filteredByGenre,
                videogamesByGenre: allByGenre,
            }

        case Actions.FILTER_BY_ORIGIN:
            let allByOrigin = state.allVideogames;
            let filteredByOrigin = state.videogamesByGenre;
            if(action.payload === Constant.EXISTING_GAME) {
                allByOrigin = allByOrigin.filter(elem => !elem.created);
                filteredByOrigin = filteredByOrigin.filter(elem => !elem.created)
            }
            else if (action.payload === Constant.CREATED_GAME) {
                allByOrigin = allByOrigin.filter(elem => elem.created);
                filteredByOrigin = filteredByOrigin.filter(elem => elem.created)
            }
            return {
                ...state,
                videogame_list: filteredByOrigin,
                videogamesByOrigin: allByOrigin,
            }
        
        case Actions.FILTER_ALL_GAMES:
            return {
                ...state,
                videogame_list: state.allVideogames.sort((a,b)=>(Utils.mySortAscendingComparingFunc(a.name,b.name))),
                videogamesByGenre: state.allVideogames.sort((a,b)=>(Utils.mySortAscendingComparingFunc(a.name,b.name))),
                videogamesByOrigin: state.allVideogames.sort((a,b)=>(Utils.mySortAscendingComparingFunc(a.name,b.name))),
            }

        case Actions.SORT_BY_NAME:
            let sortedByName = state.videogame_list;
            let sortedGenreByName  = state.videogamesByGenre;
            let sortedOriginByName = state.videogamesByOrigin;
            if(action.payload === Constant.ASCENDING){
                sortedByName.sort((a,b)=>Utils.mySortAscendingComparingFunc(a.name,b.name));
                sortedGenreByName.sort((a,b)=>Utils.mySortAscendingComparingFunc(a.name,b.name));
                sortedOriginByName.sort((a,b)=>Utils.mySortAscendingComparingFunc(a.name,b.name));
            }
            else if(action.payload === Constant.DESCENDING){
                sortedByName.sort((a,b)=>Utils.mySortDescendingComparingFunc(a.name,b.name));
                sortedGenreByName.sort((a,b)=>Utils.mySortDescendingComparingFunc(a.name,b.name));
                sortedOriginByName.sort((a,b)=>Utils.mySortDescendingComparingFunc(a.name,b.name));
            }
            // console.log(state.allVideogames)
            return {
                ...state,
                videogame_list: sortedByName,
                videogamesByGenre:  sortedGenreByName,
                videogamesByOrigin: sortedOriginByName,
            }

        case Actions.SORT_BY_RATING:
            let sortedByRating = state.videogame_list;
            let sortedGenreByRating  = state.videogamesByGenre;
            let sortedOriginByRating = state.videogamesByOrigin;
            if(action.payload === Constant.ASCENDING){
                sortedByRating.sort((a,b)=>Utils.mySortAscendingComparingFunc(a.rating, b.rating));
                sortedGenreByRating.sort((a,b)=>Utils.mySortAscendingComparingFunc(a.rating, b.rating));
                sortedOriginByRating.sort((a,b)=>Utils.mySortAscendingComparingFunc(a.rating, b.rating));
            }
            else if(action.payload === Constant.DESCENDING){
                sortedByRating.sort((a,b)=>Utils.mySortDescendingComparingFunc(a.rating, b.rating));
                sortedGenreByRating.sort((a,b)=>Utils.mySortDescendingComparingFunc(a.rating, b.rating));
                sortedOriginByRating.sort((a,b)=>Utils.mySortDescendingComparingFunc(a.rating, b.rating));
            }
            // console.log(state.allVideogames)
            return {
                ...state,
                videogame_list: sortedByRating,
                videogamesByGenre:  sortedGenreByRating,
                videogamesByOrigin: sortedOriginByRating,
            }
        
        case Actions.ERROR:
            return {
                ...state,
                error: action.payload,
            }

        case Actions.RESET_VIDEOGAME_BY_NAME:
            return {
                ...state,
                videogame: action.payload,
            }

        default: return {...state};
    }
}