
// solo el codigo del servidor 
const express = require('express');
const expressHandlebars = require('express-handlebars');
const path = require('path')
const morgan = require('morgan');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

//INICIALIZACIONES
const app = express();
require('./config/passport');

//CONFIGURACIONES (QUIERO QUE HAGA EXPRESS BASADO EN MODULOS)
app.set('port', process.env.PORT || 4002);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', expressHandlebars({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: {
        isMultipleOf: function(index, value) {
            return (index % value === 0);
        },
        isMultipleOfPlusOne: function(index, value) {
            return ((index + 1) % value === 0);
        },
        ifCond: function(v1, operator, v2, options) {
            switch (operator) {
                case '===':
                    return (v1 === v2) ? options.fn(this) : options.inverse(this);
                case '!==':
                    return (v1 !== v2) ? options.fn(this) : options.inverse(this);
                default:
                    return options.inverse(this);
            }
        },
        eq: function (a, b) {
            return a === b;
        }
        }
    }));
app.set('view engine', '.hbs');


//MIDDLEWARES(FUNCIONES QUE SE EJECUTAN A MEDIDA QUE LLEGAN LAS PETICIONES)
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


//GLOBAL VARIABLES
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

//RUTAS
app.use(require('./routes/index.routes'));
app.use(require('./routes/users.routes'));
app.use(require('./routes/products.routes'));


//STATIC FILES(ARCHIVOS A LOS CUALES DE ACCEDE SIN PERMISOS)
app.use(express.static(path.join(__dirname, 'public')));


module.exports = app;