/* eslint-disable import/no-duplicates */
import express from 'express';
import user from '../controller/user';
import transaction from '../controller/transaction';
import verifyToken from '../middlewares/verifyToken';
import { isUserValid } from '../middlewares/checkAuth';
import { validateSignup, validateSignin, validateEdit } from '../middlewares/userCredentials';
import { validateAmount, checkAmountAndAccountBalance, checkAmountAndLoanBalance, checkAccountNumber } from '../middlewares/transactionCredentials';

const app = express.Router();

app.get('/', (req, res) => res.send('Welcome to Banking App Demo'));

// User Routes
app.post('/register', validateSignup, user.userRegister);
app.post('/login', validateSignin, user.userLogin);
app.put('/edit', verifyToken, isUserValid, validateEdit, user.editProfile);
app.get('/users', user.getAllUsers);
app.get('/users/:userId', user.getSingleUser);
app.get('/balance', verifyToken, isUserValid, user.checkBalance);

// Transaction Routes
app.post('/deposit', verifyToken, isUserValid, validateAmount, transaction.depositMoney);
app.post('/withdraw', verifyToken, isUserValid, checkAmountAndAccountBalance, transaction.withdrawMoney);
app.post('/transfer', verifyToken, isUserValid, checkAmountAndAccountBalance, checkAccountNumber, transaction.transferMoney);
app.post('/requestLoan', verifyToken, isUserValid, checkAmountAndLoanBalance, transaction.requestLoan);

export default app;
