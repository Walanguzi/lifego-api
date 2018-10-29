const jwt = require('jsonwebtoken');
const passwordHash = require('password-hash');

const {
  sendMail,
  getModel,
  findOne,
  findAll,
  createRecord,
  findAndCount,
  updateRecord,
} = require('../utils');

const User = getModel('users');

const associationOptions = {
  include: [
    {
      model: User,
      as: 'friends',
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt'],
      },
    },
  ],
};

const findOneUser = id => findOne('users', {
  where: { id },
  ...associationOptions,
});

const findAllUsers = where => findAll('users', {
  where,
  ...associationOptions,
});

const findFollowers = async (id) => {
  const followers = [];

  const users = await findAllUsers({});

  users.forEach((follower) => {
    follower.toJSON().friends.forEach((friend) => {
      if (friend.id === id) followers.push(follower.toJSON());
    });
  });

  return followers;
};

const createUser = async (request) => {
  const [user, created] = await createRecord('users', {
    where: {
      email: request.body.email,
    },
  }, request.body);

  if (!request.body.social) {
    if (created) return user;

    return null;
  }

  return user;
};

const findByEmail = email => findOne('users', {
  where: { email },
});

const updateUserAndReturnToken = async ({
  data, value, secret, expires,
}) => {
  const { count } = await findAndCount('users', { where: data });

  if (count > 0) return null;

  const [key] = Object.keys(data);

  const newUser = await updateRecord('users', {
    where: { [key]: value },
  }, data);

  return jwt.sign(newUser.dataValues, secret, { expiresIn: expires });
};

const changeEmail = async ({
  newEmail, email, secret, expires,
}) => {
  const data = { email: newEmail };

  return updateUserAndReturnToken({
    data, value: email, secret, expires,
  });
};

const sendEmailChangeConfirmation = async ({
  newEmail, newToken, response,
}) => sendMail(
  'Email confirmation',
  'Your email has been changed. Click <a href="https://bucketlist-redux.herokuapp.com/activate">here</a> to activate.',
  newEmail,
  () => {
    response.status(200);
    response.json({
      message: 'Email changed',
      token: newToken,
    });
  },
);

const validatePassword = ({
  error, decoded, oldPassword, newPassword, confirm, response,
}) => {
  if (error) {
    response.status(401);
    response.json({ message: 'Invalid token' });
    return false;
  }

  if (oldPassword === newPassword) {
    response.status(400);
    response.json({ message: 'Do not use old password' });
    return false;
  }

  if (!passwordHash.verify(oldPassword, decoded.password)) {
    response.status(401);
    response.json({ message: 'Wrong password' });
    return false;
  }

  if (confirm !== newPassword) {
    response.status(400);
    response.json({ message: 'Passwords do not match' });
    return false;
  }

  return true;
};

const changePassword = async ({
  email, newPassword, secret, expires,
}) => {
  const result = await updateRecord('users', {
    where: { email },
  }, {
    password: passwordHash.generate(newPassword),
  });

  return jwt.sign(result.dataValues, secret, { expiresIn: expires });
};

const sendResetConfirmation = ({
  email, password, response,
}) => sendMail(
  'Password reset',
  `Your password has been reset. New password is <b>${password}</b>. Login with new password and change it. Do not share your password with anyone.`,
  email,
  async () => {
    await updateRecord('users', {
      where: { email },
      returning: true,
    }, {
      password: passwordHash.generate(password),
    });

    response.status(200);
    response.json({ message: `Password has been reset and sent to ${email}` });
  },
);

module.exports = {
  findOneUser,
  createUser,
  findByEmail,
  changeEmail,
  sendEmailChangeConfirmation,
  validatePassword,
  changePassword,
  sendResetConfirmation,
  findFollowers,
};
