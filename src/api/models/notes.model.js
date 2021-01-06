const mongoose = require('mongoose');

/**
 * Transaction Schema
 * @private
 */
const NoteSchema = new mongoose.Schema(
  {
    notebook: {
      type: mongoose.Types.ObjectId,
      ref: 'NoteBooks',
      autopopulate: true,
    },
    description: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    data: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  },
);

NoteSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Note', NoteSchema);
