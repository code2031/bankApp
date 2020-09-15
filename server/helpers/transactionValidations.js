import { validNumber } from "./regEx";
import  Model  from '../models';

//Check user in the database
const userFound  = (userId) => Model.user.findOne({
  where: { id : userId }
}); 

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
      amountErrors.amount.push("Amount can only be digit numbers");
    }
    return amountErrors;

 }
  
 /**
* @description validate amount
* @function amountValidations
* @param {object} body
* @returns {Array} amountErrors
*/

static async checkAccount (body, userId) {
 const { amount } = body; 
 const user = await userFound(userId);
 ;
 const amountErrors = {}; 
 if (!amount || !validNumber.test(amount)) {
     amountErrors.amount = [];
     amountErrors.amount.push("Amount can only didgit numbers");
   } 
  if (user.dataValues.accountBalance < amount ) {
    amountErrors.accountBalance = [];
    amountErrors.accountBalance.push("Insufficient Fund");

  }
   return amountErrors; 

}  

}