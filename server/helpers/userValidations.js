import  Model  from '../models';
import { validName, validEmail, validPhoneNumber } from "./regEx";

//Check if email already in the database
const checkEmail = (email) => Model.user.findOne({
  where: { email }
}); 
//Check if phoneNumber already in the database
const checkPhoneNumber = (phoneNumber) => Model.user.findOne({
  where: { phoneNumber }
}); 
 
/**
 * @description validate user details
 * @class validateDetails
 */
export default class validations {
  /**
   * @description validate user details
   * @function signupValidations
   * @param {object} body
   * @returns {Array} signupErrors
   */
  static async signupValidations(body) {
    const { firstName, lastName, middleName, phoneNumber, email, password, confirmPassword } = body;
    const signupErrors = {};
    const emailAlreadyExist = await checkEmail(email);  
    const phoneNumberAlreadyExist = await checkPhoneNumber(phoneNumber);  

    if (!firstName || firstName.length < 3 || !validName.test(firstName)) {
      signupErrors.firstName = [];
      signupErrors.firstName.push(
        "First name is required, with at least three alphabetical characters"
      );
    }

    if (!lastName || lastName.length < 3 || !validName.test(lastName)) {
      signupErrors.lastName = [];
      signupErrors.lastName.push(
        "Last name is required, with at least three alphabetical characters"
      );
    }

    if (!middleName || middleName.length < 3 || !validName.test(middleName)) {
      signupErrors.middleName = [];
      signupErrors.middleName.push(
        "Middle name is required, with at least three alphabetical characters"
      );
    }

    if (!phoneNumber || !validPhoneNumber.test(phoneNumber)) {
      signupErrors.phoneNumber = [];
      signupErrors.phoneNumber.push(
        "Phone Number is required and must be up to 11 digits"
      );
    }
    if (phoneNumberAlreadyExist) {
      signupErrors.phoneNumber = [];
      signupErrors.phoneNumber.push(
        "Phone Number already exist"
      );
    }

    if (!email || !validEmail.test(email)) {
      signupErrors.email = [];
      signupErrors.email.push("Invalid Email Format");
    }
 
    if (emailAlreadyExist) {
      signupErrors.email = [];
      signupErrors.email.push("Email already exist");
    } 

    if (!password || password.length < 3) {
      signupErrors.password = [];
      signupErrors.password.push(
        "Password is required, with at least three characters"
      );
    }

    if (!confirmPassword || confirmPassword !== password) {
      signupErrors.confirmPassword = [];
      signupErrors.confirmPassword.push("Passwords don't match");
    }
    return signupErrors;
  }

  /**
   * @description validate user details
   * @function signinValidations
   * @param {object} body
   * @returns {Array} siginErrors
   */
  static signinValidations(body) {
    const { email, password } = body;
    const siginErrors = {};

    if (!email || !validEmail.test(email)) {
      siginErrors.email = [];
      siginErrors.email.push("Invalid Email Format");
    }

    if (!password || password.length < 2) {
      siginErrors.password = [];
      siginErrors.password.push("Password must be at least three characters");
    }

    return siginErrors;
  }

  /**
   * @description validate user details
   * @function editValidations
   * @param {object} body
   * @returns {Array} editErrors
   */
  static async editValidations(body, userId) {
    const { firstName, lastName, middleName, email, phoneNumber } = body;
    const editErrors = {};
    const emailAlreadyExist = await checkEmail(email);
    const phoneNumberAlreadyExist = await checkPhoneNumber(phoneNumber); 

    console.log('EMAIL GOES HERE : ', emailAlreadyExist)

    if (!firstName || firstName.length < 3 || !validName.test(firstName)) {
      editErrors.firstName = [];
      editErrors.firstName.push("First Name must be at least three alphabetical characters");
    }

    if (!lastName || lastName.length < 3 || !validName.test(lastName)) {
      editErrors.lastName = [];
      editErrors.lastName.push("Last Name must be at least three alphabetical characters");
    }

    if (!middleName || middleName.length < 3 || !validName.test(middleName)) {
      editErrors.middleName = [];
      editErrors.middleName.push("Middle Name must be at least three alphabetical characters");
    }
    if (!email || !validEmail.test(email)) {
      editErrors.email = [];
      editErrors.email.push("Invalid Email Format");
    }
    if (emailAlreadyExist != null && emailAlreadyExist.dataValues.email.length > 0 && emailAlreadyExist.dataValues.id !== userId
    ) {
      editErrors.email = [];
      editErrors.email.push("User with this email already exist");
    }

    if (!phoneNumber || !validPhoneNumber.test(phoneNumber)) {
      editErrors.phoneNumber = [];
      editErrors.phoneNumber.push("Phone Number is required and must be up to 11 digits" );
    }
    
    if (phoneNumberAlreadyExist !== null &&
      phoneNumberAlreadyExist.dataValues.phoneNumber.length > 0 &&
      phoneNumberAlreadyExist.dataValues.id !== userId
    ) {
      editErrors.phoneNumber = [];
      editErrors.phoneNumber.push("User with this phone number already exist");
    }
    return editErrors;

  }


}
