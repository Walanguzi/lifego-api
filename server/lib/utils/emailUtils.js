const nodemailer = require('nodemailer');
const axios = require('axios');

const instance = axios.create();

instance.defaults.headers.common['Content-Type'] = 'application/json';
instance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
instance.defaults.headers.common.token = process.env.EMAIL_SCHEDULER_TOKEN;

const url = process.env.EMAIL_SCHEDULER_URL;

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

const generateEmailData = ({ bucketlist, context }) => ({
  to: context.decoded.email,
  date: bucketlist.dueDate,
  subject: `Deadline for '${bucketlist.name}'`,
  body: `Dear ${context.decoded.displayName}, you have 24 hours to finish <b>${bucketlist.name}</b>.`,
});

const scheduleEmail = async ({ bucketlist, context }) => instance.post(`${url}schedule`, generateEmailData({ bucketlist, context }));

const updateSchedule = async ({ bucketlist, context }) => instance.put(`${url}update/${bucketlist.jobId}`, generateEmailData({ bucketlist, context }));

const cancelSchedule = async id => instance.delete(`${url}cancel/${id}`);

module.exports = {
  sendMail,
  scheduleEmail,
  updateSchedule,
  cancelSchedule,
};
