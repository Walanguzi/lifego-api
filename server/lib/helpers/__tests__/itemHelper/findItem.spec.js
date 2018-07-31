const { findItem } = require('../../itemHelper');
const {
  createRecord,
  getModel,
} = require('../../../utils/modelUtils');

const users = getModel('users');
const items = getModel('items');
const bucketlists = getModel('bucketlists');


describe('findItem tests', () => {
  test('finds a item', async (done) => {
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
    const [{ dataValues: bucketlist }] = await createRecord('bucketlists', { where: {} }, buckData);

    const itemData = {
      name: 'dfbbdbd',
      bucketlistId: bucketlist.id,
    };

    const [{ dataValues: item }] = await createRecord('items', { where: {} }, itemData);

    const queryData = {
      id: item.id,
      bucketlistId: bucketlist.id,
    };

    const foundItem = await findItem(queryData);

    expect(foundItem.name).toEqual(itemData.name);

    await users.destroy({
      where: {},
    });

    await items.destroy({
      where: {},
    });

    await bucketlists.destroy({
      where: {},
    });

    done();
  });
});
