import { SEARCH_POKEMON, SET_POKEMONS } from '../actions/actionType'

const initialState = {
    pokemons: [],
}

export const pokemonsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_POKEMONS:

            return { ...state, pokemons: action.payload }

        case SEARCH_POKEMON:

            return {...state, pokemons: action.payload}

        default:
            return state
    }
}