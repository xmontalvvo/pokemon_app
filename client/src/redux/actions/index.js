import {SET_POKEMONS, SEARCH_POKEMON} from './actionType'

export const setPokemons = (payload) => ({
    type: SET_POKEMONS,
    payload: payload,
})

export const searchPokemon = (poke) => ({
    type: SEARCH_POKEMON,
    payload: poke
})