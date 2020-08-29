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

    if(user === null) {
      return response.json({error: true});
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
    
    if(created === false) {
      return response.json({ error: "Já existe um usuario cadastrado com este email." })
    }

    return response.json(user);
  },

  async delete(request, response) {
    const { id } = request.params;

    const userExist = await User.findByPk(id);

    if(!userExist) {
      return response.json({ error: true });
    }

    await User.destroy({
      where: {
        id
      }
    });

    return response.json({ sucess: 'Usuario deletado' });
  },

  async addActive(request, response) {
    const { name, price, amount, patrimonyHere, percentageGoal, currentPercentage } = request.body;

    
  }
}