const { sendResetConfirmation } = require('../../userHelper');

jest.mock('../../../utils', () => ({
  getModel: () => {},
  findOne: () => {},
  findAll: () => {},
  createRecord: () => {},
  findAndCount: () => {},
  updateRecord: () => {},
  sendMail: (subject, text, email, callback) => {
    callback();
  },
}));

describe('sendResetConfirmation tests', () => {
  test('calls sendMail', async (done) => {
    const data = {
      email: 'email@email.com',
      password: 'password',
      response: {
        status: jest.fn(),
        json: jest.fn(),
      },
    };

    await sendResetConfirmation(data);

    expect(data.response.status).toHaveBeenCalledWith(200);
    expect(data.response.json).toHaveBeenCalledWith({
      message: `Password has been reset and sent to ${data.email}`,
    });

    done();
  });
});

jest.clearAllMocks();
