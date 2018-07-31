const { addDetails } = require('../../notificationHelper');
const {
  createRecord,
  getModel,
  findAll,
  updateRecord,
} = require('../../../utils/modelUtils');

const users = getModel('users');
const Notification = getModel('notifications');

let user;

describe('addDetails tests', () => {
  beforeEach(async (done) => {
    await users.destroy({
      where: {},
    });

    await Notification.destroy({
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

    [user] = await createRecord('users', { where: {} }, userData);

    const [friend] = await createRecord('users', { where: friendData }, friendData);

    const data = {
      type: 'comment',
      sourceUserId: user.id,
      bucketlistId: user.id,
      text: 'text',
    };

    const data2 = {
      ...data,
      sourceUserId: friend.id,
    };

    const data3 = {
      ...data2,
      bucketlistId: friend.id,
    };

    const data4 = {
      ...data3,
      sourceUserId: user.id,
    };

    await createRecord('notifications', {
      where: data,
    }, data);

    await createRecord('notifications', {
      where: data2,
    }, data2);

    await createRecord('notifications', {
      where: data3,
    }, data3);

    await createRecord('notifications', {
      where: data4,
    }, data4);

    done();
  });

  test('adds user details', async (done) => {
    let notifs = await findAll('notifications', { where: {} });

    const [notif, notif2] = notifs;

    await updateRecord('notifications', {
      where: { id: notif.id },
    }, { read: true });

    await updateRecord('notifications', {
      where: { id: notif2.id },
    }, { read: true });

    notifs = await findAll('notifications', { where: {} });

    const { read, unread } = await addDetails(notifs);

    const [notification] = unread.concat(read);

    expect(notification.user).toEqual(user.displayName);

    done();
  });

  afterEach(async (done) => {
    await users.destroy({
      where: {},
    });

    await Notification.destroy({
      where: {},
    });

    done();
  });
});
