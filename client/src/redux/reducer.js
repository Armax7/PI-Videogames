import * as actions from './actions'

const initialState = {
    videogame_list: [],
    videogame: {},
}

export default function rootReducer (state = initialState, action) {
    switch(action.type) {
        case actions.GET_VIDEOGAMES:
            return {
                ...state,
                videogame_list: action.payload,
            }
    }
}