const nodemailer = require('nodemailer');

const config = require('./smtp');

const trasporter = nodemailer.createTransport({
  host: config.host,
  port: config.port,
  secure: false,
  auth: {
    user: config.user,
    pass: config.pass,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = trasporter;