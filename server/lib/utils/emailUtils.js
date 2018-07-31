const nodemailer = require('nodemailer');

const sendMail = async (subject, text, to, callback) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_SENDER,
      pass: process.env.EMAIL_PASSWORD,
    },
    logger: true,
    debug: false,
  });

  const mailOptions = {
    from: process.env.EMAIL_SENDER,
    to,
    subject,
    text,
    html: text,
  };

  return transporter.sendMail(mailOptions, (error) => {
    if (error) {
      callback(error);

      return;
    }

    callback(null);
  });
};

module.exports = {
  sendMail,
};
