import express from 'express';
import user from '../controller/user';
import transaction from '../controller/transaction';
import verifyToken from '../middlewares/verifyToken';
import { isUserValid, isUserAdmin } from '../middlewares/checkAuth';
import { validateSignup, validateSignin, validateEdit } from '../middlewares/userCredentials';
import { validateAmount, checkAccountBalance } from '../middlewares/transactionCredentials';
const app = express.Router();

// User Routes
app.post('/register', validateSignup, user.userRegister);
app.post('/login', validateSignin, user.userLogin);
app.put('/edit', verifyToken, isUserValid, validateEdit, user.editProfile);
app.get('/users', user.getAllUsers);
app.get('/users/:userId', user.getSingleUser);

// Transaction Routes
app.post('/deposit', verifyToken, isUserValid, validateAmount, transaction.depositMoney);
app.post('/withdraw', verifyToken, isUserValid, checkAccountBalance, transaction.withdrawMoney);

export default app
