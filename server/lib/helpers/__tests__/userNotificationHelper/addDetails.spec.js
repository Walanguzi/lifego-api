const { addDetails } = require('../../userNotificationHelper');
const {
  createRecord,
  getModel,
  findAll,
  updateRecord,
} = require('../../../utils/modelUtils');

const users = getModel('users');
const UserNotification = getModel('userNotifications');

let user;

describe('addDetails tests', () => {
  beforeEach(async (done) => {
    await users.destroy({
      where: {},
    });

    await UserNotification.destroy({
      where: {},
    });

    const userData = {
      displayName: 'test user',
      email: 'test@user.com',
      username: 'test@user.com',
      password: 'fgfvsvd',
      privacy: 'friends',
    };

    const friendData = {
      displayName: 'test friend',
      email: 'test@friend.com',
      username: 'test@friend.com',
      password: 'fgfvsvd',
      privacy: 'friends',
    };

    [user] = await createRecord('users', { where: userData }, userData);

    const [friend] = await createRecord('users', { where: friendData }, friendData);

    const data = {
      type: 'new',
      userId: user.dataValues.id,
      friendId: user.dataValues.id,
      text: 'text',
    };

    const data2 = {
      ...data,
      friendId: friend.id,
    };

    const data3 = {
      ...data2,
      userId: friend.id,
    };

    const data4 = {
      ...data3,
      friendId: user.id,
    };

    await createRecord('userNotifications', {
      where: data,
    }, data);

    await createRecord('userNotifications', {
      where: data2,
    }, data2);

    await createRecord('userNotifications', {
      where: data3,
    }, data3);

    await createRecord('userNotifications', {
      where: data4,
    }, data4);

    done();
  });

  test('adds user details', async (done) => {
    let notifs = await findAll('userNotifications', { where: {} });
    const [notif, notif2] = notifs;

    await updateRecord('userNotifications', {
      where: { id: notif.id },
    }, { read: true });

    await updateRecord('userNotifications', {
      where: { id: notif2.id },
    }, { read: true });

    notifs = await findAll('userNotifications', { where: {} });

    const { read, unread } = await addDetails(notifs);

    const [userNotification] = unread.concat(read);

    expect(userNotification.user).toEqual(user.displayName);
    expect(userNotification.friendId).toEqual(user.id);

    done();
  });

  afterEach(async (done) => {
    await users.destroy({
      where: {},
    });

    await UserNotification.destroy({
      where: {},
    });

    done();
  });
});
