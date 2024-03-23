//

const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.use(new LocalStrategy({
    usernameField: 'correo',
    passwordField: 'password'
}, async (correo, password, done) =>{
    
    const user = await User.findOne({correo})
    if(!user){
        return done(null, false, {message: 'El usuario no existe'});
    } else{
        
        const match = await user.matchPassword(password)
        if (match){
            return done(null, user);
        } else{
            return done(null, false, {message: 'Contraseña incorrecta'});
        }
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user); // Pasamos el usuario encontrado a done
    } catch (err) {
        done(err, null); // Pasamos el error a done
    }
});



