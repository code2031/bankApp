import validation from '../helpers/transactionValidations';

export const validateAmount = async (req, res, next) => {
  const errors = await validation.amountValidation(req.body);
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      errors
    });
  }
  return next();
};

export const checkAccountBalance = async (req, res, next) => {
  const userId = parseInt(req.decoded.userId);
  const errors = await validation.checkAccount(req.body, userId);
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      errors
    });
  }
  return next();
};