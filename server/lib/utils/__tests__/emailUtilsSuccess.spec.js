const { sendMail } = require('../emailUtils');

jest.mock('nodemailer', () => ({
  createTransport: () => ({
    sendMail: (options, call) => {
      call();
    },
  }),
}));

describe('emailUtils success tests', () => {
  test('sends email', async (done) => {
    const callback = jest.fn();

    await sendMail('', '', '', callback);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(null);

    done();
  });
});

jest.clearAllMocks();
