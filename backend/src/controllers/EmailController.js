const trasporter = require('../config/nodemailer');

module.exports = {
  async sendEmail(request, response) {
    const { name, email, message } = request.body;

    await trasporter.sendMail({
      from: `${name}<${email}>`,
      to: process.env.EMAIL,

      subject: 'Contato',
      text: message,
    });

    await trasporter.sendMail({
      from: process.env.EMAIL,
      to: email,
  
      subject: `Não responda <${process.env.EMAIL}>`,
      text: 'O seu email chegou ao nosso sistema, agradecemos o contato',
    });

    return response.json({ sucess: true });
  },
}