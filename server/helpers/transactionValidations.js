import { validNumber } from "./regEx";

/**
* @description validate transaction details
* @class Validations
*/

export default class Validations {
  
    /**
   * @description validate amount
   * @function amountValidations
   * @param {object} body
   * @returns {Array} amountErrors
   */

   static async amountValidation (body) {
    const { amount } = body;
    const amountErrors = {};

    if (!amount || !validNumber.test(amount)) {
        amountErrors.amount = [];
        amountErrors.amount.push("Amount can only didgit numbers");
      }
      return amountErrors;

   }

}