import { validNumber } from './regEx';
import  Model  from '../models';

//Check user in the database
const userFound  = (userId) => Model.user.findOne({
  where: { id : userId }
}); 

//Check account number in the database
const checkAccount  = (accountNumber) => Model.user.findOne({
  where: { accountNumber }
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
      amountErrors.amount.push('Amount can only be digit numbers');
    }
    return amountErrors;

 }
  
 /**
* @description validate amount and account balance
* @function checkAmountAndAccountBalance
* @param {object} body
* @returns {Array} amountErrors
*/

static async checkAmountAndAccountBalance (body, userId) {
 const { amount } = body; 
 const user = await userFound(userId);
 ;
 const amountErrors = {}; 
 if (!amount || !validNumber.test(amount)) {
     amountErrors.amount = [];
     amountErrors.amount.push('Amount can only digit numbers');
   } 
  if (user.dataValues.accountBalance < amount ) {
    amountErrors.accountBalance = [];
    amountErrors.accountBalance.push('Insufficient Fund');
  }
   return amountErrors; 

}  
  
 /**
* @description validate amount and account balance
* @function checkAmountAndLoanBalance
* @param {object} body
* @returns {Array} amountErrors
*/

static async checkAmountAndLoanBalance (body, userId) {
 const { amount } = body; 
 const user = await userFound(userId);
 ;
 const amountErrors = {}; 
 if (!amount || !validNumber.test(amount)) {
     amountErrors.amount = [];
     amountErrors.amount.push('Amount can only digit numbers');
   } 
  if (user.dataValues.loanBalance > 0 ) {
    amountErrors.loanBalance = [];
    amountErrors.loanBalance.push('You have a pending loan, please pay up!');
  }
   return amountErrors; 

}  
  
/**
* @description validate account number
* @function checkAccountNumber
* @param {object} body
* @returns {Array} accountErrors
*/

static async checkAccountNumber (body, userId) {
const { accountNumber } = body;
const accountErrors = {};

if (!accountNumber || !validNumber.test(accountNumber)) {
    accountErrors.number = [];
    accountErrors.number.push('Account number is required  with only digit numbers');
  }

if (accountNumber) {
    const accountNumberFound = await checkAccount(accountNumber);
  if (accountNumberFound == null) {
      accountErrors.accountNumber = [];
      accountErrors.accountNumber.push('Account number not found, kindly check and try again!');
    }
  if (accountNumberFound !== null && accountNumberFound.dataValues.id == userId) {
    accountErrors.id = [];
    accountErrors.id.push('Sorry, you can\'t do self transfer');
  }
}
  return accountErrors;

}  

}