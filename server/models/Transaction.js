module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    accountNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Account number field cannot be empty'
        }
      }
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Amount field cannot be empty'
        }
      }
    },
    accountName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Account name field cannot be empty'
        }
      }
    },
  }, {});
  Transaction.associate = function(models) {
    // associations can be defined here
    Transaction.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'users',
      onDelete: 'CASCADE',
    });
  };
  return Transaction;
};