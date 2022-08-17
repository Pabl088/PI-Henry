const router = require('express').Router();
const axios = require('axios');

module.exports= router.get('/', async function (req, res) {

    const {id} = req.params;

    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        res.json(response.data);
    } catch (error) {
        res.status(404).send('Pokemon no encontrado', error);
    };
});