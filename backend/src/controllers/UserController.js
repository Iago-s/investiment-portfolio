const User = require('../models/User');
const Active = require('../models/Active');

module.exports = {
  async login(request, response) {
    const { email, password } = request.body;

    const user = await User.findOne({
      where: {
        email,
        password
      }
    });

    if (user === null) {
      return response.json({ error: true });
    }

    return response.json(user);
  },

  async register(request, response) {
    const { email, password } = request.body;

    const [user, created] = await User.findOrCreate({
      where: {
        email
      },
      defaults: {
        email,
        password
      }
    });

    if (created === false) {
      return response.json({ error: "Já existe um usuario cadastrado com este email." })
    }

    return response.json(user);
  },

  async update(request, response) {
    const { email, password, user_id } = request.body;

    const userUpdate = await User.update({
      email,
      password
    }, {
      where: {
        id: user_id,
      }
    });

    if(userUpdate[0] === 0) {
      return response.json({ error: true });
    }

    const user = await User.findOne({
      where: {
        id: user_id
      }
    });

    return response.json(user.dataValues);
  },

  async delete(request, response) {
    const { user_id } = request.params;

    await User.destroy({
      where: {
        id: user_id,
      }
    });

    await Active.destroy({
      where: {
        user_id,
      }
    });

    return response.json({ sucess: 'Usuario deletado' });
  },
}