import express from 'express';
import user from '../controller/users';
import verifyToken from '../middlewares/verifyToken';
import { validateSignup, validateSignin, validateEdit } from '../middlewares/userCredentials';
const app = express.Router()

app.post('/register', validateSignup, user.userRegister);
app.get('/users', user.getAllUsers);
app.get('/users/:id', user.getSingleUser);

export default app;
