'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => { 

      return queryInterface.createTable('users', { 
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
      },
       firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'First name field cannot be empty'
          }
        }
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Last name field cannot be empty'
          }
        }
      },
      middleName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Middle name field cannot be empty'
          }
        }
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Email cannot be empty'
          },
          isEmail: {
            msg: 'invalid email address'
          }
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Password field cannot be empty'
          }
        }
      },
      phoneNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Phone number field cannot be empty'
          }
        }
      },
      accountNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Account number field cannot be empty'
          }
        }
      },
      accountBalance: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      loanBalance: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      role: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Role field cannot be empty'
          }
        }
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
      })
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('users');
  }
};
