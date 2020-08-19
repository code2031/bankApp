import bcrypt from "bcryptjs";
import createToken from "../helpers/createToken";
import {User, Transaction} from '../models';

const saltRounds = 10;

const accountNumber = () => {
  let numbers = "52";
  for (let i = 1; i <= 8; i++) {
    numbers += Math.floor(Math.random() * 10);
  }
  return parseInt(numbers);
};

/**
 * @description users controller
 * class users
 */
export default class users {
  static async userRegister(req, res) {
    let createUser;
    const { firstName, lastName, middleName, phoneNumber, email, password } = req.body; 
    await bcrypt.hash(password, saltRounds, async (error, hash) => {
      createUser = User.create({
        firstName,
        lastName,
        middleName,
        email,
        password: hash, 
        phoneNumber,
        accountNumber: accountNumber(),
        role: 0
      });
      return res.status(201).json({
        message: 'User successfully created',
        token: await createToken(createUser.dataValues)
      });
    });
  }

  static async getAllUsers(req, res) {
    const id = parseInt(req.params.id); 
  }

  static async getSingleUser(req, res) {
    const id = parseInt(req.params.id); 
  }
  
}
