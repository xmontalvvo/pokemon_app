import { NEXT, PREV, RESET_PAGE, SEARCH_POKEMON, SET_POKEMONS } from '../actions/actionType'

const initialState = {
    pokemons: [],
    numPage: 1
}

export const pokemonsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_POKEMONS:

            return { ...state, pokemons: action.payload }

        case SEARCH_POKEMON:

            return { ...state, pokemons: [action.payload] }

        case RESET_PAGE:
            return { ...state, numPage: 1 }

        case PREV:
            return { ...state, numPage: state.numPage - 1 }

        case NEXT:
            return { ...state, numPage: state.numPage + 1 }

        default:
            return state
    }
}