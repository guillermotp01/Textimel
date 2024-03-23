const { Router } = require('express')
const router = Router()

const { renderProductForm,  
    renderProduct,
    createNewProduct,
    deleteProduct,
    updateProduct,
    renderEditProductForm, renderProductDetails, renderProductShop, searchProduct, filterProducts} =  require('../controllers/products.controller');

//crear
router.get('/product/add', renderProductForm)

router.post('/product/new-products', createNewProduct)

//obtener
router.get(['/product/all-products', '/product/all-products-client'], renderProduct);

//mostrar detalles 
router.get('/product/product-details/:id', renderProductDetails);

//mostrar lista de productos en el carrito 
router.get('/shop/products-list', renderProductShop);

//editar
router.get('/product/edit/:id', renderEditProductForm)

router.put('/product/edit/:id', updateProduct)


//eliminar 
router.delete('/product/delete/:id', deleteProduct);




// Agregar esta ruta para manejar la búsqueda
router.get('/product/search', searchProduct);

//filtros
router.get('/product/filter', filterProducts);

module.exports = router