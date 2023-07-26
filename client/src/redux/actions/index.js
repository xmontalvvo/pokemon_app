import {SET_POKEMONS, SEARCH_POKEMON, RESET_PAGE} from './actionType'

export const setPokemons = (payload) => ({
    type: SET_POKEMONS,
    payload: payload,
})

export const searchPokemon = (name) => ({
    type: SEARCH_POKEMON,
    payload: name
})

export function resetPage () {
    return {
        type: RESET_PAGE,
    }
}