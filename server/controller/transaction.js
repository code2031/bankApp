import Model from "../models";

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
    const amount = parseInt(req.body.amount);
    const userId = parseInt(req.decoded.userId);

    // Fetch the user
    const userFound = await Model.user.findOne({
      where: { id: userId },
    });

    // If the user is found
    if (userFound) {
      const loanBalance = parseInt(userFound.loanBalance);
      const accountBalance = parseInt(userFound.accountBalance);

      // Check if amount to be deposited greater than or equal loan
      if (loanBalance >= 0 && amount >= loanBalance) {
        const amountRemain = amount - loanBalance;
        const newBalance = amountRemain + accountBalance;
        const depositorName = `${userFound.lastName} ${userFound.firstName} ${userFound.middleName}`;

        // Update user's account /balance in users table
        await userFound.update({
          accountBalance: newBalance,
          loanBalance: 0,
        });

        // Transaction table
        await Model.transaction.create({
          userId: userFound.id,
          accountNumber: userFound.accountNumber,
          amount: amount,
          transactionType: "Deposit",
          referenceNumber: referenceNumber(),
          accountName: depositorName,
        });
        // Get a feedback message
        return res.status(200).json({
          message: "Transaction successful!",
          report: "Loan Calculated!",
          amountDeposited: amountRemain,
          accountBalance: userFound.accountBalance,
          loanBalance: userFound.loanBalance,
        });
      }

      // Check if loan is greater than amount to be deposited
      if (loanBalance >= 0 && loanBalance > amount) {
        const newLoanBalance = loanBalance - amount;
        const depositorName = `${userFound.lastName} ${userFound.firstName} ${userFound.middleName}`;

        // Update user's account balance in users table
        await userFound.update({
          loanBalance: newLoanBalance,
        });

        // Transaction table
        await Model.transaction.create({
          userId: userFound.id,
          accountNumber: userFound.accountNumber,
          amount: amount,
          transactionType: "Deposit",
          referenceNumber: referenceNumber(),
          accountName: depositorName,
        });
        // Get a feedback message
        return res.status(200).json({
          message: "Transaction successful!",
          report: "Loan Deducted!",
          amountDeposited: 0,
          accountBalance: userFound.accountBalance,
          loanBalance: userFound.loanBalance,
        });
      }
    }
    return res.status(404).json({
      message: "User not found",
    });
  }

  static async withDrawMoney(req, res) {
    const amount = parseInt(req.body.amount);
    const userId = parseInt(req.decoded.userId);

    // Fetch the user
    const userFound = await Model.user.findOne({
      where: { id: userId },
    });

    const newBalance = userFound.accountBalance - amount;
    const depositorName = `${userFound.lastName} ${userFound.firstName} ${userFound.middleName}`;

    // Update user's account balance in users table
    await userFound.update({
      accountBalance: newBalance,
    });

    // Transaction table
    await Model.transaction.create({
      userId: userFound.id,
      accountNumber: userFound.accountNumber,
      amount: amount,
      transactionType: "Withdraw",
      referenceNumber: referenceNumber(),
      accountName: depositorName,
    });
    // Get a feedback message
    return res.status(200).json({
      message: "Transaction successful!",
      report: "Money Withdrawn!",
      amountWithdrawn: amount,
      accountBalance: userFound.accountBalance,
      loanBalance: userFound.loanBalance,
    });
  }
}
