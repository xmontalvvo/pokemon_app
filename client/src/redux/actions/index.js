import axios from 'axios'
import { SET_POKEMONS, SEARCH_POKEMON, RESET_PAGE, PREV, NEXT, GET_TYPES, FILTER_TYPES, FILTER_ORIGIN, FILTER_ORDER, FILTER_ATTACK, CREATE_POKEMON, GET_POKEMON_ID, RELOAD_HOME } from './actionType'

export const setPokemons = (payload) => ({
    type: SET_POKEMONS,
    payload: payload,
})

//:::::::::::: BUSQUEDA DE POKEMONS ::::::::::::::::
export const searchPokemon = (name) => ({
    type: SEARCH_POKEMON,
    payload: name
})

export function resetPage() {
    return {
        type: RESET_PAGE,
    }
}

//::::::::::: PAGINADO :::::::::::::::::
export function prev() {
    return {
        type: PREV,
    }
}

export function next() {
    return {
        type: NEXT,
    }
}

//:::::::::: FILTRADO POR TIPOS ::::::::::

export function getTypes(payload) {
    return {
        type: GET_TYPES,
        payload: payload,
    }
}

export function filterTypes(filter) {
    return {
        type: FILTER_TYPES,
        payload: filter,
    }
}

//::::::::: FILTRADO POR ORIGEN (API/DB) ::::::::::::

export function filterOrigin(payload) {
    return {
        type: FILTER_ORIGIN,
        payload: payload,
    }
}

//::::::::: FILTRADO POR ORDEN (DESC/ASC) ::::::::::::

export function filterOrder(filteredOrder) {
    return {
        type: FILTER_ORDER,
        payload: filteredOrder,
    }
}

//:::::::::: FILTRADO POR ATAQUE ::::::::::::::::::

export function filterAttack(filterAttack) {
    return {
        type: FILTER_ATTACK,
        payload: filterAttack,
    }
}

//:::::::::: CREAR POKEMON ::::::::::::::::::::::::

export function createPokemon(pokemon) {

    return async function (dispatch) {
        try {

            const { data } = await axios.post(`/pokemons`, pokemon)
            return dispatch({
                type: CREATE_POKEMON,
                payload: data
            })

        } catch (error) {
            console.log(error);
        }

    }
}

//::::::::::: OBTENER POKEMON POR ID :::::::::::::::
export function getPokemonId(id) {
    return async function (dispatch){
        try {
            const {data} = await axios.get(`/pokemons/${id}`)
            return dispatch({
                type: GET_POKEMON_ID,
                payload: data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

//:::::::::::: RECARGAR HOME ::::::::::::::::::::::

export function reloadHome(){
    return {
        type: RELOAD_HOME,
    }
}
