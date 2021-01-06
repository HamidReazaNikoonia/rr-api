const httpStatus = require('http-status');
const mongoose = require('mongoose');
const APIError = require('../utils/APIError');
const NoteBooks = require('../models/noteBooks.model');


exports.get = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const noteBooks = await NoteBooks.find({ user: userId });

    if (!noteBooks) {
      throw new APIError({
        message: 'Note can not found',
        status: httpStatus.NOT_FOUND,
      });
    }

    // GG
    res.status(httpStatus.OK);
    res.json({
      data: noteBooks,
    });
  } catch (err) {
    next(err);
  }
};


exports.create = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const data = Object.assign({}, req.body, { user: userId });
    const newNoteBook = await new NoteBooks(data).save();

    if (!newNoteBook) {
      throw new APIError({
        message: 'NoteBook can not save',
        status: httpStatus.BAD_REQUEST,
      });
    }

    res.status(httpStatus.CREATED);
    res.json({
      data: newNoteBook,
    });
  } catch (e) {
    next(e);
  }
};


exports.update = async (req, res, next) => {
  try {
    // const { userId } = req.params;
    const { noteBookId } = req.params;

    const NoteBook = await NoteBooks.findById(noteBookId.toString());

    if (!NoteBook) {
      throw new APIError({
        message: 'NoteBook can not found',
        status: httpStatus.NOT_FOUND,
      });
    }

    const requestData = {
      name: req.body.name || (NoteBook.name || ''),
    };

    NoteBook.set(requestData);

    const newNoteBook = await NoteBook.save();

    res.status(httpStatus.OK);
    res.json({
      data: newNoteBook,
    });
  } catch (e) {
    next(e);
  }
};


exports.delete = async (req, res, next) => {
  try {
    // const { userId } = req.params;
    const { noteBookId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(noteBookId)) {
      throw new APIError({
        message: 'NoteBook Not Found',
        isPublic: true,
        status: httpStatus.NOT_FOUND,
      });
    }


    await NoteBooks.deleteOne({ _id: noteBookId.toString() });


    res.status(httpStatus.NO_CONTENT);
    res.json({
      data: [],
    });
  } catch (e) {
    next(e);
  }
};
