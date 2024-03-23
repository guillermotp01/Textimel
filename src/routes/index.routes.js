// para las rutas (url)

const { Router } = require('express')
const router = Router();

const { renderPrincipal, renderMetodoPago} = require('../controllers/index.controller');

router.get('/principal', renderPrincipal);

router.get('/shop/payments', renderMetodoPago);


module.exports = router;