'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('user', { 
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
      },
       firstName: {
        type: Sequelize.STRING(20),
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'First name field cannot be empty'
          }
        }
      },
      lastName: {
        type: Sequelize.STRING(20),
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Last name field cannot be empty'
          }
        }
      },
      middleName: {
        type: Sequelize.STRING(20),
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Middle name field cannot be empty'
          }
        }
      },
      email: {
        type: Sequelize.STRING(20),
        allowNull: false,
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
        type: Sequelize.STRING(255),
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Password field cannot be empty'
          }
        }
      },
      phoneNumber: {
        type: Sequelize.STRING(255),
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Phone number field cannot be empty'
          }
        }
      },
      accountNumber: {
        type: Sequelize.STRING(255),
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Account number field cannot be empty'
          }
        }
      },
      accountBalance: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      loanBalance: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      role: {
        type: Sequelize.STRING(255),
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Role field cannot be empty'
          }
        }
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
      });
   
  },

  down: (queryInterface, Sequelize) => { 
      return queryInterface.dropTable('user');
  }
};
