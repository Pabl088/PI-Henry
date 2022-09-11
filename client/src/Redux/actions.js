import axios from "axios";

export const LOAD_POKEMONS = 'LOAD_POKEMONS';
export const LOAD_TYPES = 'LOAD_TYPES';
export const ALL_CURRENT_POKES = 'ALL_CURRENT_POKES';
export const GET_POKEMON_BY_ID = 'GET_POKEMON_BY_ID';
export const CLEAN_DETAILS = 'CLEAN_DETAILS';
export const UPDATE_PAGE = 'UPDATE_PAGE';
export const GET_POKEMON_BY_NAME = 'GET_POKEMON_BY_NAME';
export const ORDER_POKEMONS = 'ORDER_POKEMONS';
export const GET_CREATES = 'GET_CREATES';
export const GET_API = 'GET_API';
export const GET_ALL_POKEMONS = 'GET_ALL_POKEMONS';
export const CREATE_POKEMON = 'CREATE_POKEMON';
export const LAST_CREATED = 'LAST_CREATED';
export const CLEAN_FORM = 'CLEAN_FORM';

//export const SERVER_URL = 'http://localhost:3001';


export function getAllPokemons() {
    return async function (dispatch) {
        try {
            const res = await axios.get(`/pokemons`);
            dispatch({
                type: GET_ALL_POKEMONS,
                payload: res.data
            });
        } catch (error) {
            console.log(error);
        };
    };
};

export function getPokemons() {
    return async function (dispatch) {
        try {
            const res = await axios.get(`/pokemons`);
            dispatch({
                type: LOAD_POKEMONS,
                payload: res.data
            });
        } catch (error) {
            console.log(error);
        };
    };
};

export function getTypes() {
    return async function (dispatch) {
        try {
            const res = await axios.get(`/types`);
            dispatch({
                type: LOAD_TYPES,
                payload: res.data
            });
        } catch (error) {
            console.log(error);
        };
    };
};

export function getById(id) {
    return async function (dispatch) {
        try {
            const res = await axios.get(`/pokemons/${id}`);
            dispatch({
                type: GET_POKEMON_BY_ID,
                payload: res.data
            });
        } catch (error) {
            alert(`No existe ningun pokemon con el ID ${id}`);
        };
    };
};

export function getByName(name) {
    return async function (dispatch) {
        try {
            const res = await axios.get(`/pokemons?name=${name}`);
            dispatch({
                type: GET_POKEMON_BY_NAME,
                payload: res.data,
            });
        } catch (error) {
            alert(`El pokemon ${name} no existe`);
        };
    };
};

export function cleanDetails() {
    return function (dispatch) {
        dispatch({
            type: CLEAN_DETAILS,
            payload: [],
        });
    };
};

export function updatePage(page) {
    return function (dispatch) {
        dispatch({
            type: UPDATE_PAGE,
            payload: page
        });
    };
};

export function orderPokemons(orden, tipo) {
    return function (dispatch) {
        dispatch({
            type: ORDER_POKEMONS,
            payload: { orden, tipo }
        });
    };
};

export function getCreates() {
    return async function (dispatch) {
        try {
            const res = await axios.get(`/pokemons`);
            dispatch({
                type: GET_CREATES,
                payload: res.data
            });
        } catch (error) {
            console.log(error);
        };
    };
};

export function getAPI() {
    return async function (dispatch) {
        try {
            const res = await axios.get(`/pokemons`);
            dispatch({
                type: GET_API,
                payload: res.data
            });
        } catch (error) {
            console.log(error);
        };
    };
};

export function createPokemon(payload) {
    return async function (dispatch) {
        try {
            const res = await axios.post(`/pokemons/create`, payload);
            dispatch({
                type: CREATE_POKEMON,
                payload: res.data
            });
        } catch (error) {
            alert(`Error al crear pokemon. ${error.message}`);
        };
    };
};

export function getLastCreated(name) {
    return async function (dispatch) {
        try {
            const res = await axios.get(`/pokemons?name=${name}`);
            dispatch({
                type: LAST_CREATED,
                payload: res.data,
            });
        } catch (error) {
            alert(error.message);
        };
    };
};

export function cleanForm() {
    return async function (dispatch) {
        dispatch({
            type: CLEAN_FORM,
            payload: {},
        });
    };
};