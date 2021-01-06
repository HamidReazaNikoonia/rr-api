const express = require('express');
const validate = require('express-validation');
const noteBooksController = require('../../controllers/noteBooks.controller');
const notesController = require('../../controllers/note.controller');
const { createNoteBook } = require('../../validations/notes.validation');

const router = express.Router();

// NoteBoos Routes

router.get('/:userId/notebooks', noteBooksController.get);
router.post('/:userId/notebooks', validate(createNoteBook), noteBooksController.create);

// Update
router.put('/:userId/notebooks/:noteBookId', noteBooksController.update);

// Delete
router.delete('/:userId/notebooks/:noteBookId', noteBooksController.delete);


// NoteBoos Routes

// Get Notes of NoteBook
router.get('/:userId/notebooks/:noteBookId/note', notesController.get);

// Create Note
router.post('/:userId/notebooks/:noteBookId/note', notesController.create);


// Update Note
router.put('/:userId/note/:noteId', notesController.update);

// Delete Note
router.delete('/:userId/note/:noteId', notesController.delete);

module.exports = router;
