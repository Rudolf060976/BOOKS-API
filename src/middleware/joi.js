const createError = require('http-errors');

const joiValidationMiddleware = (schema, property) => {
  return (req, res, next) => {
    try {
      const { error } = schema.validate(req[property]);
      const valid = !error;

      if (valid) {
        next();
      } else {
        const { details } = error;
        const message = details.map((detail) => detail.message).join(',');
        throw createError(400, message);
      }
    } catch (error) {
      next(error);
    }
  };
};

module.exports = joiValidationMiddleware;
