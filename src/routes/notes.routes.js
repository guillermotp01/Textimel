const { Router } = require('express')
const router = Router()

const { renderNoteForm, 
    createNewNote, 
    deleteNote, 
    renderEditForm, 
    updateForm, 
    renderNote } =  require('../controllers/notes.controller');


//crear
router.get('/notes/add', renderNoteForm)

router.post('/notes/new-notes', createNewNote)

//obtener
router.get('/notes', renderNote)

//editar
router.get('/notes/edit/:id', renderEditForm)

router.put('/notes/edit/:id', updateForm)


//eliminar 
router.delete('/notes/delete/:id', deleteNote);


module.exports = router