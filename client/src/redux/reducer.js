import { CREATE_POKEMON, FILTER_ATTACK, FILTER_ORDER, FILTER_ORIGIN, FILTER_TYPES, GET_TYPES, NEXT, PREV, RESET_PAGE, SEARCH_POKEMON, SET_POKEMONS } from './actions/actionType'

const initialState = {
    pokemons: [],
    types: [],
    pokemonsFilter: [],
    numPage: 1,
}

export default function reducer(state = initialState, action){
    switch (action.type) {
        case SET_POKEMONS:

            return { ...state, pokemons: action.payload, pokemonsFilter: action.payload }

        case SEARCH_POKEMON:

            return { ...state, pokemons: [action.payload] }

        case RESET_PAGE:
            return { ...state, numPage: 1 }

        case PREV:
            return { ...state, numPage: state.numPage - 1 }

        case NEXT:
            return { ...state, numPage: state.numPage + 1 }

        case GET_TYPES:
            return { ...state, types: action.payload }

        case FILTER_TYPES:
            if (action.payload === "All") {
                return { ...state, pokemons: [...state.pokemonsFilter] }
            }
            return {
                ...state,
                pokemons: [...state.pokemonsFilter].filter(pokemon => {
                    if (pokemon.createInDb && pokemon.types) {
                        return pokemon.types.map(type => type.name).includes(action.payload)
                    } else {
                        return pokemon.type.includes(action.payload)
                    }
                })
            }

        case FILTER_ORIGIN:
            const statePokemons = state.pokemonsFilter
            const defineOrigin = action.payload === 'Database' ? statePokemons.filter(pokemon => pokemon.createInDb) : statePokemons.filter(pokemon => !pokemon.createInDb)
            return {
                ...state,
                pokemons: action.payload === 'All' ? statePokemons : defineOrigin
            }

        case FILTER_ORDER:
            if (action.payload === "DESC") {
                return {
                    ...state,
                    pokemons: [...state.pokemons].sort((a, b) => a.name.localeCompare(b.name))
                }
            } else if (action.payload === "ASC") {
                return {
                    ...state,
                    pokemons: [...state.pokemons].sort((a, b) => b.name.localeCompare(a.name))
                }
            }
            break

        case FILTER_ATTACK:
            if (action.payload === "LOW") {
                return {
                    ...state,
                    pokemons: [...state.pokemons].sort((a, b) => a.attack - b.attack)
                }
            } else if (action.payload === "HIGH") {
                return {
                    ...state,
                    pokemons: [...state.pokemons].sort((a, b) => b.attack - a.attack)
                }
            }
            break

        case CREATE_POKEMON:
            return { ...state, pokemons: [...state.pokemonsFilter, action.payload] }

        default:
            return state
    }
}