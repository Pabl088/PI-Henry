const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const Pokemons = require('./Pokemons.js');
const Tipo = require('./Tipos.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/types', Tipo);
router.use('/pokemons', Pokemons);


module.exports = router;
