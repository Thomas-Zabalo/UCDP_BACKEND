import { validationResult } from "express-validator";

export const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const groupedErrors = {};

    errors.array().forEach(err => {
      const field = err.path;

      if (!groupedErrors[field]) {
        groupedErrors[field] = [];
      }

      groupedErrors[field].push(err.msg);
    });

    return res.status(400).json({
      errors: groupedErrors,
    });
  }

  next();
};