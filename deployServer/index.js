require('dotenv').config();
const http = require('http');
const crypto = require('crypto');

const { exec } = require('child_process');

http.createServer((req, res) => {
  req.on('data', (chunk) => {
    const sig = `sha1=${crypto.createHmac('sha1', process.env.GITHUB_SECRET).update(chunk.toString()).digest('hex')}`;

    const isVerified = req.headers['x-hub-signature'] === sig;
    const isAuthorized = req.body.sender.login === process.env.GITHUB_USERNAME;
    const isMaster = req.ref.includes('master');

    if (isVerified && isAuthorized && isMaster) {
      exec('~/lifego-api/scripts/deploy-prod.sh', (err, stdout, stderr) => {
        const error = err || stderr;

        if (error) return res.send(500).json({ error });

        return res.send(200);
      });
    }
  });
}).listen(3003);
