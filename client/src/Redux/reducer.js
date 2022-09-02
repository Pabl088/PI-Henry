import { LOAD_POKEMONS, LOAD_TYPES, GET_POKEMON_BY_ID, CLEAN_DETAILS, UPDATE_PAGE, GET_POKEMON_BY_NAME, ORDER_POKEMONS, GET_CREATES, GET_API, GET_ALL_POKEMONS, CREATE_POKEMON, LAST_CREATED, CLEAN_FORM } from './actions.js';
import * as order from '../Utils/Filters.js';

const initialState = {
    pokemons: [],
    types: [],
    allCurrentPokemons: [],
    currentPokemon: {},
    createdPokemon: {},
    currentPage: 1
};

function Reducer(state = initialState, action) {
    switch (action.type) {

        case GET_ALL_POKEMONS:
            return { ...state, pokemons: [...action.payload] };

        case LOAD_POKEMONS:
            return { ...state, allCurrentPokemons: action.payload };

        case LOAD_TYPES:
            return { ...state, types: action.payload };

        case GET_POKEMON_BY_ID:
            return { ...state, currentPokemon: action.payload };

        case CLEAN_DETAILS:
            return { ...state, currentPokemon: action.payload };

        case UPDATE_PAGE:
            return { ...state, currentPage: action.payload };

        case GET_POKEMON_BY_NAME:
            return { ...state, allCurrentPokemons: action.payload };

        case ORDER_POKEMONS:
            let result;
            if (action.payload.orden === "filter") {
                if (action.payload.tipo === "TODOS") {
                    result = state.pokemons;
                    return {
                        ...state,
                        allCurrentPokemons: [...result]
                    };
                } else {
                    result = order.filterByType(action.payload.tipo, state.pokemons);
                    return {
                        ...state,
                        allCurrentPokemons: [...result]
                    };
                };
            };
            if (action.payload.orden === "AZ") {
                result = order.orderA_Z(state.allCurrentPokemons);
            };
            if (action.payload.orden === "ZA") {
                result = order.orderZ_A(state.allCurrentPokemons);
            };
            if (action.payload.orden === "MIN_MAX") {
                result = order.orderMin_MaxAtaque(state.allCurrentPokemons);
            };
            if (action.payload.orden === "MAX_MIN") {
                result = order.orderMax_MinAtaque(state.allCurrentPokemons);
            };
            return {
                ...state,
                allCurrentPokemons: [...result],
                pokemons: [...result]
            };
        case GET_CREATES:
            return {
                ...state,
                allCurrentPokemons: order.filterByDb(action.payload)
            };

        case GET_API:
            return {
                ...state,
                allCurrentPokemons: order.filterByApi(action.payload)
            };

        case CREATE_POKEMON:
            return {
                ...state,
                createdPokemon: action.payload,
            };

        case LAST_CREATED:
            return {
                ...state,
                currentPokemon: action.payload,
            };

        case CLEAN_FORM:
            return {
                ...state,
                createdPokemon: action.payload,
                currentPokemon: action.payload
            };

        default: return state;
    };
};

export default Reducer;