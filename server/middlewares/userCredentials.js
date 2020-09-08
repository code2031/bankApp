import validation from '../helpers/userValidations';
/* eslint radix: ["error", "as-needed"] */

export const validateSignup = async (req, res, next) => {
  const errors = await validation.signupValidations(req.body);
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      errors
    });
  }
  return next();
};

export const validateSignin = async (req, res, next) => {
  const errors = await validation.signinValidations(req.body);
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      errors
    });
  }
  return next();
};

export const validateEdit = async (req, res, next) => {
  const userId = parseInt(req.decoded.userId);
  const errors = await validation.editValidations(req.body, userId); 
  if (Object.keys(errors).length > 0) {
    return res.status(401).json({
      errors
    });
  }
  return next();
};
