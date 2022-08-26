const router = require('express').Router();
const { Pokemon, Tipo } = require('../db.js');
const { loadPokes } = require('../Middlewares/loadData.js');

router.get('/', async function (req, res) {

    const { name } = req.query;

    if (name) {

        try {
            const poke = await Pokemon.findOne({
                where: { nombre: name },
                include: {
                    model: Tipo,
                    attributes: ['nombre'],
                    through: { attributes: [] }
                }
            });

            if (!poke) return res.status(404).send(`No existe ningún Pókemon con el nombre ${name}`);

            return res.json(poke);

        } catch (error) {

            return res.status(404).send(`El Pókemon solicitado no existe. ${error.message}`);
        };
    };

    try {
        const pokesApi = await Pokemon.findAll({ where: { del_usuario: false } });
        if (!pokesApi.length) await loadPokes();

        const pokes = await Pokemon.findAll({
            //attributes: ['nombre', 'img', 'ID'],
            include: {
                model: Tipo,
                attributes: ['nombre'],
                through: { attributes: [] }
            }
        });

        return res.json(pokes);

    } catch (error) {

        return res.status(500).send(`Ocurrió un error al cargar los datos. ${error.message}`);
    };
});

router.get('/:id', async function (req, res) {

    const { id } = req.params;

    try {
        const poke = await Pokemon.findByPk(id, {
            include: [{
                model: Tipo,
                attributes: ['nombre'],
                through: { attributes: [] }
            }]
        });

        if (!poke) return res.status(404).send('No existe ningún Pókemon con la ID especificada');

        return res.json(poke);

    } catch (error) {

        return res.status(404).send(`No existe ningún Pókemon con la ID especificada. ${error.message}`);
    };
});

router.post('/create', async function (req, res) {

    const { nombre, vida, ataque, defensa, velocidad, altura, peso, Tipos, img } = req.body;

    if (!nombre || !vida || !ataque || !defensa || !velocidad || !altura || !peso || !Tipos) return res.status(400).send(`Debes completar todos los campos para crear el Pókemon`);
    try {
        const pokeUser = await Pokemon.create({
            nombre,
            vida,
            ataque,
            defensa,
            velocidad,
            altura,
            peso,
            img,
            del_usuario: true
        });

        for (const item of Tipos) {
            const typeDB = await Tipo.findOne({ where: { nombre: item } });
            await pokeUser.addTipo(typeDB);
        };

        return res.json(await Pokemon.findByPk(pokeUser.ID, {
            include: {
                model: Tipo,
                attributes: ['nombre'],
                through: { attributes: [] }
            }
        }));

    } catch (error) {

        return res.status(400).send(`Hubo un problema al crear el Pókemon. ${error.message}`);
    };
});

module.exports = router;