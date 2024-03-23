const notesCtrl = {};

const note = require('../models/note');

notesCtrl.renderNoteForm = (req, res) => {
    console.log(req.user)
    res.render('notes/new-notes');
}

//agregar
notesCtrl.createNewNote = async (req, res) => {
    const {title, description} = req.body;
    const newNote = new note({title , description});
    await newNote.save();
    req.flash('success_msg', 'Nota Agregada Correctamente');
    res.redirect('/notes')
}

//mostrar
notesCtrl.renderNote = async (req, res) => {
    const notes = await note.find();
    res.render('notes/all-notes', {notes});
}

//editar
notesCtrl.renderEditForm = async (req, res) => {
    const notes = await note.findById(req.params.id);
    res.render('notes/edit-notes', {notes});
}

notesCtrl.updateForm = async (req, res) => {
    const { title, description } = req.body;
    await note.findByIdAndUpdate(req.params.id, { title, description })
    req.flash('success_msg', 'Nota Actualizada Correctamente');
    res.redirect('/notes')
}


//eliminar
notesCtrl.deleteNote = async (req, res) => {
    await note.findOneAndDelete(req.params.id);
    req.flash('success_msg', 'Nota Eliminada Correctamente');
    res.redirect('/notes');
}


module.exports = notesCtrl;