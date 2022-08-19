const router = require('express').Router();
const { Tipo } = require('../db.js');


router.get('/', async function (req, res) {

    try {
        const types = await Tipo.findAll({
            attributes: ['nombre']
        });

        return res.json(types);

    } catch (error) {

        return res.status(404).send(`Error al cargar la lista de tipos. ${error.message}`);
    };
});

module.exports = router;