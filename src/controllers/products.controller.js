const productsCtrl = {};

const Product = require('../models/product');

productsCtrl.renderProductForm = (req, res) => {
    console.log(req.user)
    res.render('product/new-products');
}
//agregar
productsCtrl.createNewProduct = async (req, res) => {
    const { nombre, descripcion, precio, stockS, stockM, stockL, stockXL, color, genero, imagen } = req.body;
    
    const newProduct = new Product({
        nombre,
        descripcion,
        precio,
        stock: {
            S: stockS,
            M: stockM,
            L: stockL,
            XL: stockXL
        },
        color,
        genero,
        imagen
    });
    await newProduct.save();
    req.flash('success_msg', 'Producto Agregado Correctamente');
    res.redirect('/product/all-products');
};

//mostrar
productsCtrl.renderProduct = async (req, res) => {
    const products = await Product.find();
    
    if (req.url === '/product/all-products') {
        // Renderizar contenido específico para /product/all-products
        res.render('product/all-products', { products });
    } else if (req.url === '/product/all-products-client') {
        // Renderizar contenido específico para /product/all-products-client
        res.render('product/all-products-client', { products });
    } else {
        // Manejar rutas no reconocidas
        res.status(404).send('Página no encontrada');
    }
}

//mostrar detalles del producto 
productsCtrl.renderProductDetails = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.render('product/product-details', { product });
    } catch (error) {
        console.error(error);
        req.flash('error_msg', 'Error al cargar los detalles del producto');
        res.redirect('/product/all-products');
    }
};

//mostrar la lista de productos en el carrito 

productsCtrl.renderProductShop = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.render('shop/products-list', { product });
    } catch (error) {
        console.error(error);
        req.flash('error_msg', 'Error al cargar los detalles del producto');
        res.redirect('/product/all-products');
    }
};

//editar
productsCtrl.renderEditProductForm = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.render('product/edit-products', { product });
    } catch (error) {
        console.error(error);
        req.flash('error_msg', 'Error al cargar el producto para editar');
        res.redirect('/product/all-products');
    }
}

productsCtrl.updateProduct = async (req, res) => {
    const { nombre, descripcion, precio, stockS, stockM, stockL, stockXL, color, genero, imagen } = req.body;
    const updateFields = {
        nombre,
        descripcion,
        precio,
        stock: {
            S: stockS,
            M: stockM,
            L: stockL,
            XL: stockXL
        },
        color,
        genero,
        imagen
    };

    try {
        await Product.findByIdAndUpdate(req.params.id, updateFields);
        req.flash('success_msg', 'Producto Actualizado Correctamente');
        res.redirect('/product/all-products');
    } catch (error) {
        console.error(error);
        req.flash('error_msg', 'Error al actualizar el producto');
        res.redirect('/product/all-products');
    }
}


//eliminar
productsCtrl.deleteProduct = async (req, res) => {
    try {
        await Product.findOneAndDelete(req.params.id);
        req.flash('success_msg', 'Producto Eliminado Correctamente');
        res.redirect('/product/all-products');
    } catch (error) {
        console.error(error);
        req.flash('error_msg', 'Error al eliminar el producto');
        res.redirect('/product/all-products');
    }
}




// Agregar esta función al controlador para manejar los filtros
productsCtrl.searchProduct = async (req, res) => {
    const query = req.query.query; // Obtén el término de búsqueda de la URL
    
    try {
        // Realiza una búsqueda en la base de datos usando el término
        const products = await Product.find({
            $or: [
                { nombre: { $regex: query, $options: 'i' } }, // Búsqueda insensible a mayúsculas
                { descripcion: { $regex: query, $options: 'i' } },
            ],
        });

        res.render('product/search-results', { products, query });
    } catch (error) {
        console.error(error);
        req.flash('error_msg', 'Error en la búsqueda de productos');
        res.redirect('/product/all-products'); // Redirige a la lista de productos en caso de error
    }
};

productsCtrl.filterProducts = async (req, res) => {
    const { color, precio, genero, talla } = req.query; // Obtén los filtros de la URL

    try {
        // Construye una consulta basada en los filtros
        const filter = {};

        if (color) {
            filter.color = color;
        }

        if (precio) {
            // Parsea el valor del precio y construye la consulta
            const [minPrice, maxPrice] = precio.split('-');
            filter.precio = { $gte: minPrice, $lte: maxPrice };
        }

        if (genero) {
            filter.genero = genero;
        }

        if (talla) {
            filter.talla = talla;
        }

        // Realiza una búsqueda en la base de datos usando los filtros
        const products = await Product.find(filter);

        res.render('product/filter-results', { products });
    } catch (error) {
        console.error(error);
        req.flash('error_msg', 'Error en la aplicación de filtros');
        res.redirect('/product/all-products'); // Redirige a la lista de productos en caso de error
    }
};


module.exports = productsCtrl;