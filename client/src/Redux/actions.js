import axios from "axios";

export const LOAD_POKEMONS = 'LOAD_POKEMONS';
export const LOAD_TYPES = 'LOAD_TYPES';

export const SERVER_URL = 'http://localhost:3001';

export function getPokemons() {
    return async function (dispatch) {
        try {
            const response = await axios.get(`${SERVER_URL}/pokemons`);
            dispatch({
                type: LOAD_POKEMONS,
                payload: response.data
            });
        } catch (error) {
            console.log(error);
        };
    };
};

export function getTypes() {
    return async function (dispatch) {
        try {
            const response = await axios.get(`${SERVER_URL}/types`);
            dispatch({
                type: LOAD_TYPES,
                payload: response.data
            });
        } catch (error) {
            console.log(error);
        };
    };
};