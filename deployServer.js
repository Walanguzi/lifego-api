require('dotenv').config();
const { exec } = require('child_process');
const http = require('http');
const crypto = require('crypto');
require('winston-mongodb');
const winston = require('winston');

const logger = winston.createLogger({
  levels: winston.config.syslog.levels,
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  transports: [
    new winston.transports.Console({
      level: 'error',
    }),
    new winston.transports.File({
      filename: 'deploy.log',
      level: 'info',
    }),
  ],
});

const port = 3004;

http.createServer((req, res) => {
  req.on('data', (buffer) => {
    const data = JSON.parse(buffer.toString());
    const ourSignature = `sha1=${crypto.createHmac('sha1', process.env.GITHUB_SECRET).update(JSON.stringify(data)).digest('hex')}`;

    const isVerified = crypto.timingSafeEqual(Buffer.from(req.headers['x-hub-signature']), Buffer.from(ourSignature)); // verify signature
    const isAuthorized = data.sender.login === process.env.GITHUB_USERNAME; // verify username
    const isMaster = data.pull_request.head.ref.includes('develop'); // verify branch
    logger.info('------------------STARTING DEPLOYMENT------------------');

    if (isVerified && isAuthorized && isMaster) {
      try {
        exec(process.env.DEPLOY_PATH, (err, stdout, stderr) => {
          const error = err || stderr;

          if (error) {
            logger.error(error);
            return res.end();
          }

          logger.info('------------------FINISHED DEPLOYMENT------------------');
          return res.end();
        });
      } catch (error) {
        logger.error(error);
        res.end();
      }
    }
  });

  res.end();
}).listen(port, () => {
  console.log(`Running deploy server on PORT: ${port}`); // eslint-disable-line no-console
});
