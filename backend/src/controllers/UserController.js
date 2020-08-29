const User = require('../models/User');
const Active = require('../models/Active');

module.exports = {
  async register(request, response) {
    const { email, password } = request.body;

    const user = await User.create({
      email,
      password
    });

    return response.json(user);
  },

  async delete(request, response) {
    const { id } = request.params;

    const userExist = await User.findByPk(id);

    if(!userExist) {
      return response.json({ error: 'Este usuario não existe' });
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