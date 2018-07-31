const { sendMail } = require('../emailUtils');

jest.mock('nodemailer', () => ({
  createTransport: () => ({
    sendMail: (options, call) => {
      call('error');
    },
  }),
}));

describe('emailUtils failure tests', () => {
  test('returns error on failure', async (done) => {
    const callback = jest.fn();

    await sendMail('', '', '', callback);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('error');

    done();
  });
});

jest.clearAllMocks();
