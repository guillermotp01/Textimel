const { Router } = require('express')
const router = Router()

const { renderSignUpForm, renderSigninForm, renderUsers, renderEditUserForm, updateUser, deleteUser, signin, signup, logout} = require('../controllers/users.controller');


//crear
router.get('/users/signup', renderSignUpForm);

router.post('/users/signup', signup);

//mostrar

router.get(['/users/all-adm-users', '/users/info-user'], renderUsers);

//editar
router.get('/users/edit/:id', renderEditUserForm)

router.put('/users/edit/:id', updateUser)


//obtener
router.get('/users/signin', renderSigninForm);

router.post('/users/signin', signin);

router.get('/users/logout', logout);

//eliminar
router.delete('/users/delete/:id', deleteUser);


module.exports = router