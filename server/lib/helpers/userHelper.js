const jwt = require('jsonwebtoken');
const passwordHash = require('password-hash');
const models = require('../../models');

const { sendMail } = require('../utils');
const {
  findById,
  findOne,
  findAll,
  createRecord,
  findAndCount,
  updateRecord,
  deleteRecord,
} = require('../utils/modelUtils');

const { createNotification } = require('../resolvers/notifications/create');

const User = models.users;

const findOneUser = id => findOne('users', {
  where: { id },
  include: [
    {
      model: User,
      as: 'friends',
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt'],
      },
    },
  ],
});

const findUsers = id => findAll('users', {
  where: { id: { $ne: id } },
  include: [
    {
      model: User,
      as: 'friends',
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt'],
      },
    },
  ],
});

const findAllUsers = where => findAll('users', {
  where,
  include: [
    {
      model: User,
      as: 'friends',
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt'],
      },
    },
  ],
});

const findFollowers = async (id, users) => {
  const followers = [];

  users.forEach((follower) => {
    follower.toJSON().friends.forEach((friend) => {
      if (friend.id === id) {
        followers.push(follower.toJSON());
      }
    });
  });
  return followers;
};

const getUserProfile = async (response, id) => {
  const user = await findById('users', id);

  if (user) {
    const users = await findUsers(id);

    const followers = await findFollowers(id, users);

    const {
      password,
      ...profile
    } = user;

    profile.followers = followers;
    profile.friends = profile.friends.filter(friend => friend.id !== id);

    response.status(200);
    response.json(profile);
    return;
  }

  response.status(401);
  response.json({ message: 'Unauthorised' });
};

const createUser = async (request) => {
  const [user, created] = await createRecord('users', {
    where: {
      email: request.body.email,
    },
  }, request.body);

  if (!request.body.social) {
    if (created) {
      return user;
    }

    return null;
  }

  return user;
};

const findByEmail = email => findOne('users', {
  where: { email },
});

const updateUserAndReturnToken = async ({
  where, value, secret, expires,
}) => {
  const { count } = await findAndCount('users', { where });

  if (count > 0) {
    return null;
  }

  const [key] = Object.keys(where);

  const newUser = await updateRecord('users', where, {
    where: { [key]: value },
    returning: true,
  });

  return jwt.sign(newUser[1][0].toJSON(), secret, { expiresIn: expires });
};

const changeEmail = async ({
  newEmail, email, secret, expires,
}) => {
  const where = { email: newEmail };

  return updateUserAndReturnToken(where, email, secret, expires);
};

const sendEmailChangeConfirmation = ({
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
    password: passwordHash.generate(newPassword),
  }, {
    where: { email },
    returning: true,
  });

  return jwt.sign(result[1][0].toJSON(), secret, { expiresIn: expires });
};

const sendResetConfirmation = ({
  email, password, response,
}) => sendMail(
  'Password reset',
  `Your password has been reset. New password is <b>${password}</b>. Login with new password and change it. Do not share your password with anyone.`,
  email,
  async () => {
    await updateRecord('users', {
      password: passwordHash.generate(password),
    }, {
      where: { email },
      returning: true,
    });

    response.status(200);
    response.json({ message: `Password has been reset and sent to ${email}` });
  },
);

const handleFriend = async ({
  socket, request, user, action, friend: { displayName, id },
}) => {
  const friend = await findById(
    'users',
    action === 'addFriend' ? request.body.id : request.params.friendId,
  );

  await user[action](friend);

  if (action === 'addFriend') {
    createNotification({
      type: 'new',
      userId: id,
      friendId: friend.id,
      text: `<b>${displayName}<b> added you as a friend.`,
    }, request);
  } else {
    createNotification({
      type: 'remove',
      user,
      friend,
    }, request);
  }

  socket.emit('followers', {
    type: action === 'addFriend' ? 'new' : 'remove',
    user,
    friend,
  });
  return friend;
};

const updateProfile = async (request, { email }) => {
  const user = await updateRecord('users', {
    ...request.body,
    pictureUrl: request.body.pictureUrl || null,
  }, {
    where: { email },
    returning: true,
  });

  const {
    password,
    ...profile
  } = user[1][0].toJSON();

  return profile;
};

const deleteAccount = async id => deleteRecord('users', id);

module.exports = {
  findOneUser,
  findAllUsers,
  getUserProfile,
  createUser,
  findByEmail,
  changeEmail,
  sendEmailChangeConfirmation,
  validatePassword,
  changePassword,
  sendResetConfirmation,
  handleFriend,
  updateProfile,
  deleteAccount,
};
