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

export const checkAmountAndAccountBalance = async (req, res, next) => {
  const userId = parseInt(req.decoded.userId);
  const errors = await validation.checkAmountAndAccountBalance(req.body, userId);
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      errors
    });
  }
  return next();
};

export const checkAmountAndLoanBalance = async (req, res, next) => {
  const userId = parseInt(req.decoded.userId);
  const errors = await validation.checkAmountAndLoanBalance(req.body, userId);
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      errors
    });
  }
  return next();
};

export const checkAccountNumber = async (req, res, next) => {
  const userId = parseInt(req.decoded.userId);
  const errors = await validation.checkAccountNumber(req.body, userId);
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      errors
    });
  }
  return next();
};