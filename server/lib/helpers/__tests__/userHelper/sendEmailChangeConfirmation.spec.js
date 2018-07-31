const { sendEmailChangeConfirmation } = require('../../userHelper');

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

describe('sendEmailChangeConfirmation tests', () => {
  test('calls sendMail', async (done) => {
    const data = {
      newEmail: 'email@email.com',
      newToken: 'new token',
      response: {
        status: jest.fn(),
        json: jest.fn(),
      },
    };

    await sendEmailChangeConfirmation(data);

    expect(data.response.status).toHaveBeenCalledWith(200);
    expect(data.response.json).toHaveBeenCalledWith({
      message: 'Email changed',
      token: data.newToken,
    });

    done();
  });
});

jest.clearAllMocks();
