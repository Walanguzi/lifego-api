const {
  validateFields,
  generatePassword,
} = require('../../utils');

const {
  findByEmail,
  sendResetConfirmation,
} = require('../../helpers/userHelper');

module.exports = (request, response) => {
  validateFields(request, response, ['email'], async () => {
    const { email } = request.body;

    const user = await findByEmail(email);

    if (!user) {
      response.status(404);
      response.json({ message: 'Your have not registered with us yet' });
      return;
    }

    const password = generatePassword();

    sendResetConfirmation({ email, password, response });
  });
};
