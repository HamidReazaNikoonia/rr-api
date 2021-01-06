const mongoose = require('mongoose');

/**
 * Transaction Schema
 * @private
 */
const NoteBooksSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      autopopulate: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

NoteBooksSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('NoteBooks', NoteBooksSchema);
