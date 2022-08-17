const router = require('express').Router();
const axios = require('axios');
const { Pokemon, Tipo } = require('../db.js');
const { loadPokes, loadTypes } = require('../Middlewares/loadData.js');

router.get('/', async function (req, res) {

    const pokesApi = await Pokemon.findAll({ where: { del_usuario: false } });
    if (!pokesApi.length) await loadPokes();
    // const tiposApi = await Tipo.findAll({ where: { del_usuario: false } });
    // if (!tiposApi.length) await loadTypes();

    const pokes = await Pokemon.findAll({
        attributes: ['nombre', 'img', 'ID'],
        include: {
            model: Tipo,
            attributes: ['nombre']
        }
    });

    //const pokes = await Tipo.findAll();

    return res.json(pokes);
});

router.get('/:id', async function (req, res) {

    const { id } = req.params;

    const pokesApi = await Pokemon.findAll({ where: { del_usuario: false } });
    if (!pokesApi.length) await loadPokes();
    const tiposApi = await Tipo.findAll({ where: { del_usuario: false } });
    if (!tiposApi.length) await loadTypes();

    const pokes = await Pokemon.findAll({
        attributes: ['nombre', 'tipo', 'img']
    });

    //const pokes = await Tipo.findAll();

    return res.json(pokes);
});


module.exports = router;