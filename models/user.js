'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.Log, { sourceKey: 'username', foreignKey: 'username', as: 'log' })
      this.hasMany(models.Exercise, { sourceKey: 'username', foreignKey: 'username', as: 'exercise' })
    }
  };
  User.init({
    _id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true
    },
    username: {
      type: DataTypes.STRING,
      unique: { msg: 'Username is already taken' }
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.fn('datetime', ['now', 'localtime'])
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.fn('datetime', ['now', 'localtime'])
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};