const Sequelize = require('sequelize');
const {Model} = require('sequelize');
const bcrypt = require('bcryptjs');

class User extends Model {
  static init(sequelize) {
    super.init({
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.VIRTUAL,
      password_hash: Sequelize.STRING,

    }, {
      sequelize,
    });
    this.addHook('beforeSave', async user => {
      user.password_hash = await bcrypt.hash(user.password, 8);
    })
  }

  static associate(models) {
    this.hasOne(models.Address, { foreignKey: 'id_user', as: 'address' });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

module.exports = User;