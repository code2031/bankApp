import Model from '../models';

// Generate random numbers for reference purpose
const referenceNumber = () => {
  let numbers = 'REF';
  for (let i = 1; i <= 7; i++) {
    numbers += Math.floor(Math.random() * 10);
  }
  return numbers;
};

// Insert into transaction table for transaction history purpose.
const createTransaction = (user, userAccount, amount, message, reference, accountName) => {
  Model.transaction.create({
    userId: user.id,
    accountNumber: userAccount.accountNumber,
    amount,
    transactionType: message,
    referenceNumber: reference,
    accountName,
  });
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
        const accountName = `${userFound.lastName} ${userFound.firstName} ${userFound.middleName}`;

        // Update user's account /balance in users table
        await userFound.update({
          accountBalance: newBalance,
          loanBalance: 0,
        });

        // Transaction table
        await createTransaction(userFound, userFound, amount, 'Deposit', referenceNumber(), accountName);

        // Get a feedback message
        return res.status(200).json({
          message: 'Transaction successful!',
          report: 'Loan Calculated!',
          amountDeposited: amountRemain,
          accountBalance: userFound.accountBalance,
          loanBalance: userFound.loanBalance,
        });
      }

      // Check if loan is greater than amount to be deposited
      if (loanBalance >= 0 && loanBalance > amount) {
        const newLoanBalance = loanBalance - amount;
        const accountName = `${userFound.lastName} ${userFound.firstName} ${userFound.middleName}`;

        // Update user's account balance in users table
        await userFound.update({
          loanBalance: newLoanBalance,
        });

        // Transaction table
        await createTransaction(userFound, userFound, amount, 'Deposit', referenceNumber(),
          accountName);

        // Get a feedback message
        return res.status(200).json({
          message: 'Transaction successful!',
          report: 'Loan Deducted!',
          amountDeposited: 0,
          accountBalance: userFound.accountBalance,
          loanBalance: userFound.loanBalance,
        });
      }
    }
    return res.status(404).json({
      message: 'User not found',
    });
  }

  /**
   * @description withdraw money from personal account
   * @method withdrawMoney
   * @param {*} req
   * @param {*} res
   */

  static async withdrawMoney(req, res) {
    const amount = parseInt(req.body.amount);
    const userId = parseInt(req.decoded.userId);

    // Fetch the user
    const userFound = await Model.user.findOne({
      where: { id: userId },
    });

    const newBalance = userFound.accountBalance - amount;
    const accountName = `${userFound.lastName} ${userFound.firstName} ${userFound.middleName}`;

    // Update user's account balance in users table
    await userFound.update({
      accountBalance: newBalance,
    });

    // Transaction table
    await createTransaction(userFound, userFound, amount, 'Withdrawal', referenceNumber(), accountName);

    // Get a feedback message
    return res.status(200).json({
      message: 'Transaction successful!',
      report: 'Money Withdrawn!',
      amountWithdrawn: amount,
      accountBalance: userFound.accountBalance,
      loanBalance: userFound.loanBalance,
    });
  }

  /**
   * @description transfer money from anothe user's account
   * @method transferMoney
   * @param {*} req
   * @param {*} res
   */
  static async transferMoney(req, res) {
    const { amount, accountNumber } = req.body;
    const userId = parseInt(req.decoded.userId);
    // Fetch sender
    const senderFound = await Model.user.findOne({
      where: { id: userId }
    });
    const sendertName = `${senderFound.lastName} ${senderFound.firstName} ${senderFound.middleName}`;
    // Fetch receiver
    const receiverFound = await Model.user.findOne({
      where: { accountNumber }
    });
    const receiverName = `${receiverFound.lastName} ${receiverFound.firstName} ${receiverFound.middleName}`;

    if (senderFound) {
      const newBalance = parseInt(senderFound.accountBalance) - parseInt(amount);
      // Update user's account balance in users table
      await senderFound.update({
        accountBalance: newBalance
      });
      // Transaction table
      await createTransaction(senderFound, receiverFound, amount, 'Transfer', referenceNumber(), receiverName);
    }
    if (receiverFound) {
      const newBalance = parseInt(receiverFound.accountBalance) + parseInt(amount);

      // Update user's account balance in users table
      await receiverFound.update({
        accountBalance: newBalance
      });
      // Transaction table
      await createTransaction(receiverFound, senderFound, amount, 'Receival', referenceNumber(), sendertName);
    }

    return res.status(200).json({
      message: 'Money Successfully Transfered!',
      accountBalance: senderFound.accountBalance
    });
  }

  static async requestLoan(req, res) {
    const amount = parseInt(req.body.amount);
    const userId = parseInt(req.decoded.userId);

    const interest = 0.15 * amount;
    const loan = amount + interest;

    // Fetch the user
    const userFound = await Model.user.findOne({
      where: { id: userId },
    });
    if (userFound) {
      const newBalance = parseInt(userFound.accountBalance) + amount;
      const accountName = `${userFound.lastName} ${userFound.firstName} ${userFound.middleName}`;

      // Update user's account balance in users table
      await userFound.update({
        accountBalance: newBalance,
        loanBalance: loan
      });
      // Transaction table
      await createTransaction(userFound, userFound, amount, 'Loan', referenceNumber(), accountName);
    }

    return res.status(200).json({
      message: 'Loan is Successful!',
      accountBalance: userFound.accountBalance,
      loanBalance: userFound.loanBalance
    });
  }
}
