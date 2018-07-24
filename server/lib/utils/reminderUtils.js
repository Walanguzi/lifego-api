const Agenda = require('agenda');

const nodemailer = require('nodemailer');

const agenda = new Agenda();

agenda.database(process.env.MONGODB_URI);

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

const sendMail = (subject, text, to, callback) => {
  const mailOptions = {
    from: process.env.EMAIL_SENDER,
    to,
    subject,
    text,
    html: text,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      callback(error);
      return;
    }

    callback(null);
  });
};

const run = () => {
  agenda.processEvery('1 minute');
  agenda.on('ready', () => {
    agenda.start();
  });

  return agenda;
};

const scheduleReminder = (days, type, bucketlist, request, date) => {
  const agendaInstance = request.app.get('agenda');

  agendaInstance.define(bucketlist.id.toString(), (job) => {
    const { data } = job.attrs;

    sendMail(
      data.request.body.name,
      `Hello ${data.request.decoded.displayName}. You have less than a ${data.type} to do the following: <b>${data.bucketlist.name}</b>. Let's do this!!!`,
      data.request.decoded.email,
      () => {},
    );
  });

  date.setDate(date.getDate() - days);

  agendaInstance.schedule('in 10 seconds', bucketlist.toString(), { bucketlist, type, request });
};

const createReminder = (request, bucketlist) => {
  const date = new Date(Date.parse(request.body.dueDate));
  const today = new Date(Date.now());
  const difference = Math.round((date.getTime() - today.getTime()) / 86400000);

  if (difference >= 0) {
    scheduleReminder(1, 'day', bucketlist, request, date);
  }

  if (difference >= 7) {
    scheduleReminder(6, 'week', bucketlist, request, date);
  }

  if (difference >= 30) {
    scheduleReminder(23, 'month', bucketlist, request, date);
  }

  if (difference >= 365) {
    scheduleReminder(335, 'year', bucketlist, request, date);
  }
};


const cancelReminder = (request) => {
  const agendaInstance = request.app.get('agenda');

  agendaInstance.cancel({ name: request.params.bucketlistId }, () => {});
};

module.exports = {
  run,
  scheduleReminder,
  cancelReminder,
  createReminder,
};
