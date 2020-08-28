const { Model, DataTypes } = require('sequelize');

class Active extends Model {
  static init(connection) {
    super.init({
      name: DataTypes.STRING,
      price: DataTypes.FLOAT,
      amount: DataTypes.INTEGER,
      patrimonyHere: DataTypes.FLOAT,
      percentageGoal: DataTypes.FLOAT,
      currentPercentage: DataTypes.FLOAT,
    }, {
      sequelize: connection
    });
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

module.exports = Active;