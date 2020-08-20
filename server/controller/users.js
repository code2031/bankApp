import bcrypt from 'bcryptjs';
import createToken from '../helpers/createToken';
import Model from '../models' ;

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
export default class Users {
    /**
     * @description signup a user into database
     * @method userRegister
     * @param {*} req
     * @param {*} res
     */
  static async userRegister(req, res) {
    let createUser; 
    const { firstName, lastName, middleName, phoneNumber, email, password } = req.body; 
    await bcrypt.hash(password, saltRounds, async (error, hash) => {
    createUser = await Model.user.create({
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

  /**
   * @description login user from database
   * @method userLogin
   * @param {*} req
   * @param {*} res
   */
  static async userLogin(req, res) {
    const { email, password } = req.body;
    const userFound = await Model.user.findOne({
      where: { email }
    });
    if (userFound) {
      await bcrypt.compare(password, userFound.password, (error, result) => {
        if (result) {
          return res.status(200).json({
            message: 'Access granted!',
            token: createToken(userFound)
          });
        }
        return res.status(400).json({
          message: 'Email and password not match!'
        });
      });
    } else {
      return res.status(400).json({
        message: 'Access denied!'
      });
    }
  }

    /**
     * @description fetch all users from database
     * @method getAllUsers
     * @param {*} req
     * @param {*} res
     */
  static async getAllUsers(req, res) {
    const allUsers = await Model.user.findAll({});
    if (allUsers.length > 0) {
      return res.status(200).json({
        message: 'Success',
        users: allUsers
      });
    }
    return res.status(200).json({
      message: 'No registered user yet!'
    });
  }

    /**
     * @description fetch a single user from database
     * @method getSingleUser
     * @param {*} req
     * @param {*} res
     */
  static async getSingleUser(req, res) {
    const userId = parseInt(req.params.userId);
    const userFound = await Model.user.findOne({
      where: { id: userId },
      include: [{
        model: Model.transaction,
        as: 'transactions',
      }],
    });
    if (userFound) {
      return res.status(200).json({
        message: 'Success',
        user: userFound
      });
    }
    return res.status(404).json({
      message: 'User not found!'
    });
  }
  
}
