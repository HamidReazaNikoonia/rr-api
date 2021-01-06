const Joi = require('joi');

module.exports = {

  // POST /v1/users
  createNoteBook: {
    body: {
      name: Joi.string().required(),
    },
  },
};
