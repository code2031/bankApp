import bcrypt from "bcryptjs";
import createToken from "../helpers/createToken";
import db from "../connection/myConnect";

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
    const {
      firstName,
      lastName,
      middleName,
      phoneNumber,
      email,
      password,
    } = req.body;
    const regDate = new Date().toDateString();
    await bcrypt.hash(password, saltRounds, async (error, hash) => {
      const sql = "INSERT INTO users SET ?";
      const values = {
        firstName,
        lastName,
        middleName,
        email,
        password: hash,
        phoneNumber,
        accountNumber: accountNumber(),
        role: 0,
        regDate,
      };
      createUser = await db.query(sql, values, (err, result) => {
        if (err) throw err;
        if (result) {
        res.status(201).json({
          message: "User successfully created",
          token: createToken(createUser)
        });
        }
      });
    });
  }

  static async getAllUsers(req, res) {
    const id = parseInt(req.params.id);
    const sql = `SELECT * FROM users`;
    await db.query(sql, (err, result) => {
      if (err) throw err;
      if (result) {
        return res.status(200).json({
          message: "Success",
          result : result
        });
      } 
    }); 

  }

  static async getSingleUser(req, res) {
    const id = parseInt(req.params.id);
    const sql = `SELECT * FROM users WHERE id = ${id}`;
    await db.query(sql, (err, result) => {
      if (err) throw err;
      if (result) {
        return res.status(200).json({
          message: "Success",
          result : result
        });
      } 
    }); 

  }
  
}
