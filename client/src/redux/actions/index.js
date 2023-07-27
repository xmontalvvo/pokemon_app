import {SET_POKEMONS, SEARCH_POKEMON, RESET_PAGE, PREV, NEXT, GET_TYPES, FILTER_TYPES, FILTER_ORIGIN, FILTER_ORDER, FILTER_ATTACK} from './actionType'

export const setPokemons = (payload) => ({
    type: SET_POKEMONS,
    payload: payload,
})

//:::::::::::: BUSQUEDA DE POKEMONS ::::::::::::::::
export const searchPokemon = (name) => ({
    type: SEARCH_POKEMON,
    payload: name
})

export function resetPage () {
    return {
        type: RESET_PAGE,
    }
}

//::::::::::: PAGINADO :::::::::::::::::
export function prev(){
    return {
        type: PREV,
    }
}

export function next(){
    return {
        type: NEXT,
    }
}

//:::::::::: FILTRADO POR TIPOS ::::::::::

export function getTypes(payload){
    return {
        type: GET_TYPES,
        payload: payload,
    }
}

export function filterTypes(filter){
    return {
        type: FILTER_TYPES,
        payload: filter,
    }
}

//::::::::: FILTRADO POR ORIGEN (API/DB) ::::::::::::

export function filterOrigin(payload){
    return {
        type: FILTER_ORIGIN,
        payload: payload,
    }
}

//::::::::: FILTRADO POR ORDEN (A-Z/Z-A) ::::::::::::

export function filterOrder(filteredOrder){
    return {
        type: FILTER_ORDER,
        payload: filteredOrder,
    }
}

//:::::::::: FILTRADO POR ATAQUE ::::::::::::::::::

export function filterAttack(filterAttack){
    return {
        type: FILTER_ATTACK,
        payload: filterAttack,
    }
}