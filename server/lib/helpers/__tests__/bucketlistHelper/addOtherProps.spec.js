const {
  addOtherProps,
  getAssociationOptions,
} = require('../../bucketlistHelper');

const {
  createRecord,
  getModel,
  findAll,
} = require('../../../utils');

const associationOptions = getAssociationOptions();

const users = getModel('users');
const comments = getModel('comments');
const lists = getModel('bucketlists');

describe('addOtherProps', () => {
  beforeEach(async () => {
    await users.destroy({
      where: {},
    });

    await comments.destroy({
      where: {},
    });

    await lists.destroy({
      where: {},
    });
  });

  test('Adds user details', async (done) => {
    const userData = {
      displayName: 'test user',
      email: 'test@user.com',
      username: 'test@user.com',
      password: 'fgfvsvd',
      privacy: 'friends',
    };

    const [{ dataValues: user }] = await createRecord('users', { where: {} }, userData);

    const buckData = {
      name: 'test',
      createdBy: 'test user',
      privacy: 'everyone',
      userId: user.id,
    };

    const buckData2 = {
      ...buckData,
      name: 'test2',
    };

    const buckData3 = {
      ...buckData,
      name: 'test3',
    };


    const [{ dataValues: newBuck }] = await createRecord('bucketlists', { where: {} }, buckData);

    await createRecord('bucketlists', { where: {} }, buckData2);

    await createRecord('bucketlists', { where: {} }, buckData3);

    const commentData = {
      senderId: user.id,
      content: 'dfbbdbd',
      bucketlistId: newBuck.id,
    };

    await createRecord('comments', { where: {} }, commentData);

    const rows = await findAll('bucketlists', { ...associationOptions });

    const offset = 1;
    const limit = 1;
    const count = 3;

    const { bucketlists, nextOffset, prevOffset } = await addOtherProps({
      rows,
      limit,
      offset,
      count,
    });

    const [bucketlist] = bucketlists;

    const [comment] = bucketlist.comments;

    expect(nextOffset).toEqual(offset + limit);
    expect(prevOffset).toEqual(offset - limit);
    expect(bucketlist.user).toEqual(user.displayName);
    expect(comment.user).toEqual(user.displayName);

    done();
  });

  afterEach(async (done) => {
    await users.destroy({
      where: {},
    });

    await comments.destroy({
      where: {},
    });

    done();
  });
});
