const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const Pokemons = require('./Pokemons.js');
const Tipos = require('./Tipos.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/pokemons', Pokemons);
router.use('/tipos', Tipos);


module.exports = router;
