import Model from "../models";
import { use } from "chai";

const referenceNumber = () => {
  let numbers = "REF";
  for (let i = 1; i <= 7; i++) {
    numbers += Math.floor(Math.random() * 10);
  }
  return numbers;
};

/**
 * @description transaction controller
 * class Transaction
 */

export default class Transaction {
  /**
   * @description deposit money into personal account
   * @method depositMoney
   * @param {*} req
   * @param {*} res
   */
  static async depositMoney(req, res) {
    const amount  = parseFloat(req.body.amount);
    const userId = parseInt(req.decoded.userId);

   // Fetch the user
    const userFound = await Model.user.findOne({
      where: { id: userId }
    });
    
    // If the user is found
    if (userFound) {
    const newBalance = amount + parseInt(userFound.accountBalance);
    const depositorName = `${userFound.lastName} ${userFound.firstName} ${userFound.middleName}`;
      console.log('LOAN BALANCE : ', userFound.loanBalance );

    // Deposit money into transaction table
      await Model.transaction.create({
        userId: userFound.id,
        accountNumber: userFound.accountNumber,
        amount: amount,
        transactionType: 'Deposit',
        referenceNumber: referenceNumber(),
        accountName: depositorName
      });

    // Update user's account balance in users table
      await userFound.update({
        accountBalance : newBalance
      });
    
    // Get a feedback message
      return res.status(200).json({
        message: "Transaction successful!",
        accountBalance: userFound.accountBalance,
      });
    }
    return res.status(404).json({
      message: "User not found",
    });
  }
}
