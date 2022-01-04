'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exercise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Exercise.init({
    _id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.fn('datetime', ['now', 'localtime'])
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.fn('datetime', ['now', 'localtime'])
      },
    },
    username: DataTypes.STRING,
    description: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    date: {
      type: DataTypes.DATE,
      get() {
        return new Date(this.getDataValue('date')).toDateString()
      }
    },
    timestamp: {
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'Exercise'
  });
  return Exercise;
};