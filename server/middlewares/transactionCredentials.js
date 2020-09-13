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