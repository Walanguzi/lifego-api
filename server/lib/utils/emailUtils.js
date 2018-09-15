const nodemailer = require('nodemailer');
const publish = require('../../rabbitMQ/publish');

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
  bucketlistId: bucketlist.id,
  jobId: bucketlist.jobId,
  subject: `Deadline for '${bucketlist.name}'`,
  body: `Dear ${context.decoded.displayName}, you have 24 hours to finish <b>${bucketlist.name}</b>.`,
});

const handleSchedule = async ({ bucketlist, context, type }) => {
  const data = generateEmailData({ bucketlist, context });

  publish({
    ...context.publishData,
    exchange: '',
    routingKey: 'email_queue',
    content: Buffer.from(JSON.stringify({
      data,
      type,
    })),
  });
};

const scheduleEmail = async ({ bucketlist, context }) => handleSchedule({ bucketlist, context, type: 'new' });

const updateSchedule = async ({ bucketlist, context }) => handleSchedule({ bucketlist, context, type: 'update' });

const cancelSchedule = async ({ jobId, context }) => {
  publish({
    ...context.publishData,
    exchange: '',
    routingKey: 'email_queue',
    content: Buffer.from(JSON.stringify({
      data: { jobId },
      type: 'cancel',
    })),
  });
};

module.exports = {
  sendMail,
  scheduleEmail,
  updateSchedule,
  cancelSchedule,
};
