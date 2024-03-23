const usersCtrl = {};

const passport = require('passport');

const user = require('../models/user');

//registrar
usersCtrl.renderSignUpForm = (req, res) => {
    res.render('users/signup');
}
//recibe los campos
usersCtrl.signup = async (req, res) => {
    const errors = [];
    const {nombre, apellido, dni, correo, password, confirmar_password} = req.body;
    //validaciones para el registro 
    if (password  != confirmar_password){
        errors.push({text: 'Las contraseñas no coinciden'});
    }
    if (password && password.length < 4){
        errors.push({text: 'La contraseñas debe tener mas de 4 caracteres'});
    }
    if(errors.length > 0){
        res.render('users/signup', {
            //devuelve lo siguiente 
            errors,
            nombre,
            apellido,
            dni,
            correo,
        })
    } else{
        //validar si el usuario existe y registrarlo
        const correoUser = await user.findOne({correo: correo});
        if(correoUser){
            req.flash('error_msg', 'El correo ya se encuentra en uso.');
            res.redirect('/users/signup');
        } else {
            const newUser = new user({nombre, apellido, dni, correo, password})
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('success_msg', 'Registrado Correctamente');
            res.redirect('/users/signin');
        }
    }
};

usersCtrl.renderUsers = async (req, res) => {
    const users = await user.find();
    
    console.log('req.path:', req.path);

    if (req.path === '/users/all-adm-users') {
        console.log('Renderizando all-adm-users');
        res.render('users/all-adm-users', { users , user: req.user });
    } else if (req.path === '/users/info-user') {
        console.log('Renderizando info-user');
        res.render('users/info-user', { users, user: req.user  });
    } else {
        console.log('Ruta no encontrada');
        res.status(404).send('Página no encontrada');
    }
}

//editar
usersCtrl.renderEditUserForm = async (req, res) => {
    try {
        const us = await user.findById(req.params.id);
        res.render('users/edit-users', { us });
    } catch (error) {
        console.error(error);
        req.flash('error_msg', 'Error al cargar el producto para editar');
        res.redirect('/users');
    }
}


usersCtrl.updateUser = async (req, res) => {
    const { nombre, apellido, dni, correo, rol } = req.body;
    const updateFields = {
        nombre,
        apellido,
        dni,
        correo,
        rol
    };

    try {
        await user.findByIdAndUpdate(req.params.id, updateFields);
        req.flash('success_msg', 'Usuario Actualizado Correctamente');
        res.redirect('/users/all-adm-users');
    } catch (error) {
        console.error(error);
        req.flash('error_msg', 'Error al actualizar el Usuario');
        res.redirect('/users/all-adm-users');
    }
}


//eliminar
usersCtrl.deleteUser = async (req, res) => {
    try {
        await user.findOneAndDelete(req.params.id);
        req.flash('success_msg', 'Producto Eliminado Correctamente');
        res.redirect('/users/all-adm-users');
    } catch (error) {
        console.error(error);
        req.flash('error_msg', 'Error al eliminar el producto');
        res.redirect('/users');
    }
}



//consultar
usersCtrl.renderSigninForm = (req, res) => {
    res.render('users/signin')
}


usersCtrl.signin = passport.authenticate('local', {
    failureRedirect: '/users/signin',
    successRedirect: '/principal',
    failureFlash: true
});


//log out
usersCtrl.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            // Manejar el error si lo hay
            console.error('Error al cerrar sesión:', err);
            // Puedes enviar una respuesta de error o redirigir a una página de error si es necesario
        } else {
            // La sesión se cerró con éxito
            req.flash('success message', 'La Sesión fue cerrada');
            res.redirect('/users/signin');
        }
    });
}



module.exports = usersCtrl;