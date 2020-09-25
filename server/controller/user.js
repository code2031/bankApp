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
 * @description user controller
 * class user
 */
export default class User {
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
        accountBalance : 0,
        loanBalance : 0,
        role: 0
      });
      return res.status(201).json({
        message: 'User successfully created',
        token: await createToken(createUser)
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
     * @description Edit user details
     * @method editDetails
     * @param {*} req
     * @param {*} res
     */
    static async editProfile(req, res) {
      const userId = parseInt(req.decoded.userId);
      const userFound = await Model.user.findOne({
        where: { id: userId }
      });
  
      if (userFound) {
        userFound.update({
          firstName: req.body.firstName || userFound.firstName,
          lastName: req.body.lastName || userFound.lastName,
          middleName: req.body.middleName || userFound.middleName,
          email: req.body.email || userFound.email,
          phoneNumber: req.body.phoneNumber || userFound.phoneNumber
        });
        return res.status(200).json({
          message: 'User updated successfully!',
          userFound
        });
      }
      return res.status(404).json({
        message: 'User not found'
      });
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

  /**
   * @description fetch user's acount balance from database
   * @method checkBalance
   * @param {*} req
   * @param {*} res
   */

  static async checkBalance ( req, res) {
    const userId = parseInt(req.decoded.userId);
    const userFound = await Model.user.findOne({
      where: { id: userId }
    });
    if (userFound) {
      return res.status(200).json({
        message: 'Account balance fetched!', 
        accountBalance: userFound.accountBalance
      })
    }
    return res.status(404).json({
      message: 'User not found!'
    });

  }
  
}
