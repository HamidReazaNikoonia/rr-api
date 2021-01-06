const httpStatus = require('http-status');
const mongoose = require('mongoose');
const APIError = require('../utils/APIError');
// const NoteBooks = require('../models/noteBooks.model');
const Notes = require('../models/notes.model');


exports.get = async (req, res, next) => {
  try {
    const { noteBookId } = req.params;

    // check for validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(noteBookId)) {
      throw new APIError({
        message: 'NoteBook Not Found',
        isPublic: true,
        status: httpStatus.NOT_FOUND,
      });
    }

    const notes = await Notes.find({ notebook: noteBookId });


    if (!notes) {
      throw new APIError({
        message: 'Note can not found',
        status: httpStatus.NOT_FOUND,
      });
    }

    // GG
    res.status(httpStatus.OK);
    res.json({
      data: notes,
    });
  } catch (err) {
    next(err);
  }
};


exports.create = async (req, res, next) => {
  try {
    const { noteBookId } = req.params;

    // check for validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(noteBookId)) {
      throw new APIError({
        message: 'NoteBook Not Found',
        isPublic: true,
        status: httpStatus.NOT_FOUND,
      });
    }


    const data = Object.assign({}, req.body, { notebook: noteBookId });
    const newNote = await new Notes(data).save();

    if (!newNote) {
      throw new APIError({
        message: 'Note can not save',
        status: httpStatus.BAD_REQUEST,
      });
    }

    res.status(httpStatus.CREATED);
    res.json({
      data: newNote,
    });
  } catch (e) {
    next(e);
  }
};


exports.update = async (req, res, next) => {
  try {
    // const { userId } = req.params;
    const { noteId } = req.params;

    // check for validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(noteId)) {
      throw new APIError({
        message: 'Note Not Found',
        isPublic: true,
        status: httpStatus.NOT_FOUND,
      });
    }

    const Note = await Notes.findById(noteId.toString());

    if (!Note) {
      throw new APIError({
        message: 'Note can not found',
        status: httpStatus.NOT_FOUND,
      });
    }

    const requestData = {
      title: req.body.title || (Note.title || ''),
      description: req.body.description || (Note.description || ''),
      data: req.body.data || (Note.data || ''),
    };

    Note.set(requestData);

    const newNote = await Note.save();

    res.status(httpStatus.OK);
    res.json({
      data: newNote,
    });
  } catch (e) {
    next(e);
  }
};


exports.delete = async (req, res, next) => {
  try {
    // const { userId } = req.params;
    const { noteId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(noteId)) {
      throw new APIError({
        message: 'Note Not Found',
        isPublic: true,
        status: httpStatus.NOT_FOUND,
      });
    }


    await Notes.deleteOne({ _id: noteId.toString() });


    res.status(httpStatus.NO_CONTENT);
    res.json({
      data: [],
    });
  } catch (e) {
    next(e);
  }
};
