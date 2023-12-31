import { CREATE_POKEMON, FILTER_ATTACK, FILTER_ORDER, FILTER_ORIGIN, FILTER_TYPES, GET_POKEMON_ID, GET_TYPES, NEXT, PREV, RESET_PAGE, SEARCH_POKEMON, SET_POKEMONS, RELOAD_HOME } from './actions/actionType'

const initialState = {
  pokemons: [],
  pokemonId: [],
  types: [],
  pokemonsFilter: [],
  filterTypes: [],
  numPage: 1,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_POKEMONS:

      return { ...state, pokemons: action.payload, pokemonsFilter: action.payload, filterTypes: action.payload }

    case RELOAD_HOME:

      return { ...state, pokemons: [...state.pokemonsFilter] }

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
        return { ...state, pokemons: [...state.pokemonsFilter], filterTypes: [...state.pokemonsFilter] }
      }
      return {
        ...state,
        pokemons: [...state.pokemonsFilter].filter(pokemon => {
          if (pokemon.createInDb && pokemon.types) {
            return pokemon.types.map(type => type.name).includes(action.payload)
          } else {
            return pokemon.type.includes(action.payload)
          }
        }),
        filterTypes: [...state.pokemonsFilter].filter(pokemon => {
          if (pokemon.createInDb && pokemon.types) {
            return pokemon.types.map(type => type.name).includes(action.payload)
          } else {
            return pokemon.type.includes(action.payload)
          }
        })
      }

    case FILTER_ORIGIN:
      const statePokemons = state.filterTypes
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

    case GET_POKEMON_ID:
      return { ...state, pokemonId: action.payload }

    default:
      return state
  }
}