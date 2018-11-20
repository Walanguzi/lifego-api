const { exec } = require('child_process');
const crypto = require('crypto');

module.exports = (app) => {
  app.post('webhooks/github', (req, res) => {
    const ourSignature = `sha1=${crypto.createHmac('sha1', process.env.GITHUB_SECRET).update(req.body).digest('hex')}`;

    const isVerified = crypto.timingSafeEqual(Buffer.from(req.headers['x-hub-signature']), Buffer.from(ourSignature)); // verify signature
    const isAuthorized = req.body.sender.login === process.env.GITHUB_USERNAME; // verify username
    const isMaster = req.ref.includes('master'); // verify branch

    if (isVerified && isAuthorized && isMaster) {
      exec(process.env.DEPLOY_PATH || '/home/olivermunala/lifego-api/scripts/deploy-prod.sh', (err, stdout, stderr) => {
        const error = err || stderr;

        if (error) return res.send(500).json({ error });

        return res.send(200);
      });
    }
  });
};
