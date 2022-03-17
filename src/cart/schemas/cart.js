const Joi = require("joi");

const getCartParams = Joi.object({ id: Joi.string() });

module.exports = { getCartParams };
