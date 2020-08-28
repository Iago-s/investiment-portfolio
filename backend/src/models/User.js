const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(connection) {
    super.init({
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    }, {
      sequelize: connection,
    });
  }

  static associate(models) {
    this.hasMany(models.Active, { foreignKey: 'user_id', as: 'active' });
  }
}

module.exports = User;