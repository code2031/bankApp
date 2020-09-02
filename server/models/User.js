module.exports = (sequelize, DataTypes) => {
const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
},
 firstName: {
  type: DataTypes.STRING(20),
  allowNull: false,
  validate: {
    notEmpty: {
      args: true,
      msg: 'First name field cannot be empty'
    }
  }
},
lastName: {
  type: DataTypes.STRING(20),
  allowNull: false,
  validate: {
    notEmpty: {
      args: true,
      msg: 'Last name field cannot be empty'
    }
  }
},
middleName: {
  type: DataTypes.STRING(20),
  allowNull: false,
  validate: {
    notEmpty: {
      args: true,
      msg: 'Middle name field cannot be empty'
    }
  }
},
email: {
  type: DataTypes.STRING(20),
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
  type: DataTypes.STRING(255),
  allowNull: false,
  validate: {
    notEmpty: {
      args: true,
      msg: 'Password field cannot be empty'
    }
  }
},
phoneNumber: {
  type: DataTypes.STRING(255),
  allowNull: false,
  validate: {
    notEmpty: {
      args: true,
      msg: 'Phone number field cannot be empty'
    }
  }
},
accountNumber: {
  type: DataTypes.STRING(255),
  allowNull: false,
  validate: {
    notEmpty: {
      args: true,
      msg: 'Account number field cannot be empty'
    }
  }
},
accountBalance: {
  type: DataTypes.STRING(255),
  allowNull: true
},
loanBalance: {
  type: DataTypes.STRING(255),
  allowNull: true
},
role: {
  type: DataTypes.STRING(255),
  allowNull: false,
  validate: {
    notEmpty: {
      args: true,
      msg: 'Role field cannot be empty'
    }
  }
},
}, {
  freezeTableName: true,
});
User.associate = function (models) {
  // associations can be defined here
  User.hasMany(models.transaction, {
    foreignKey: 'userId'
  });
};
return User;
};