import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.JWT_KEY;

export const createToken = (userData) => {
  const token = jwt.sign({
    userId: userData.id,
    firstName: userData.firstName,
    lastName: userData.lastName,
    middleName: userData.middleName,
    accountNumber: userData.accountNumber,
    email: userData.email,
    role: (() => ((userData.role === 1) ? 'Admin' : 'User'))()
  }, secret, {
    expiresIn: '1h'
  });
  return token;
};
export default createToken;
