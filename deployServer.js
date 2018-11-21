require('dotenv').config();
const { exec } = require('child_process');
const http = require('http');
const crypto = require('crypto');

http.createServer((req, res) => {
  req.on('data', (buffer) => {
    const data = JSON.parse(buffer.toString());
    const ourSignature = `sha1=${crypto.createHmac('sha1', process.env.GITHUB_SECRET).update(JSON.stringify(data)).digest('hex')}`;

    const isVerified = crypto.timingSafeEqual(Buffer.from(req.headers['x-hub-signature']), Buffer.from(ourSignature)); // verify signature
    const isAuthorized = data.sender.login === process.env.GITHUB_USERNAME; // verify username
    const isMaster = data.pull_request.head.ref.includes('develop'); // verify branch

    console.log({
      isVerified,
      isAuthorized,
      isMaster,
    });

    if (isVerified && isAuthorized && isMaster) {
      exec(process.env.DEPLOY_PATH, (err, stdout, stderr) => {
        const error = err || stderr;

        console.log({ error });

        if (error) return res.send({ error });

        return res.send(200);
      });
    }
  });

  res.end();
}).listen(3004);
