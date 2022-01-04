'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Log extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Exercise, { sourceKey: 'username', foreignKey: 'username', as: 'details' })
      this.belongsTo(models.User, { sourceKey: 'username', foreignKey: 'username', as: 'user' })
    }
  };
  Log.init({
    _id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true
    },
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    count: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.details != undefined ? this.details.length : 0
      }
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
    modelName: 'Log',
  });
  return Log;
};