'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('transaction', { 
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
      },
      userId: {
        type: Sequelize.STRING(255),
        allowNull: false,
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
      amount: {
        type: Sequelize.STRING(255),
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Amount field cannot be empty'
          }
        }
      },
      accountName: {
        type: Sequelize.STRING(255),
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Account name field cannot be empty'
          }
        }
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
       });
   
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('transaction');
  }
};
