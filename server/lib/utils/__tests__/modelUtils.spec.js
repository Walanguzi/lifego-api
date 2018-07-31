const {
  findById,
  findOne,
  findAll,
  findAndCount,
  createRecord,
  updateRecord,
  deleteRecord,
  getModel,
} = require('../modelUtils');

const models = require('../../../models');

const bucketlistData = {
  name: 'test',
  createdBy: 'test user',
  privacy: 'everyone',
};

describe('Model utils tests', () => {
  const user = {
    displayName: 'test user',
    email: 'test@user.com',
    username: 'test@user.com',
    password: 'fgfvsvd',
    privacy: 'friends',
  };

  beforeEach(async (done) => {
    await models.users.destroy({
      where: {},
    });

    await models.bucketlists.destroy({
      where: {},
    });

    const [{ id }] = await createRecord('users', { where: {} }, user);

    bucketlistData.userId = id;

    done();
  });

  afterEach(async (done) => {
    await models.users.destroy({
      where: {},
    });

    await models.bucketlists.destroy({
      where: {},
    });

    done();
  });

  test('getModel test', () => {
    expect(getModel('users')).toEqual(models.users);
  });

  test('findById tests', async (done) => {
    const [bucketlist] = await createRecord('bucketlists', { where: {} }, bucketlistData);

    const buck = await findById('bucketlists', bucketlist.id);

    expect(buck.name).toEqual(bucketlist.name);

    done();
  });

  test('findOne tests', async (done) => {
    const [bucketlist] = await createRecord('bucketlists', { where: {} }, bucketlistData);

    const buck = await findOne('bucketlists', {
      where: { id: bucketlist.id },
    });

    expect(buck.name).toEqual(bucketlist.name);

    done();
  });

  test('findAll tests', async (done) => {
    const [bucketlist] = await createRecord('bucketlists', { where: {} }, bucketlistData);

    const [buck] = await findAll('bucketlists', {});

    expect(buck.name).toEqual(bucketlist.name);

    done();
  });

  test('findAndCount tests', async (done) => {
    const [bucketlist] = await createRecord('bucketlists', { where: {} }, bucketlistData);

    const { count, rows: [buck] } = await findAndCount('bucketlists', {});

    expect(count).toEqual(1);
    expect(buck.name).toEqual(bucketlist.name);

    done();
  });

  test('updateRecord tests', async (done) => {
    const body = { name: 'updated name' };

    const [bucketlist] = await createRecord('bucketlists', { where: {} }, bucketlistData);

    const buck = await updateRecord('bucketlists', {
      where: { id: bucketlist.id },
    }, body);

    expect(buck.name).toEqual(body.name);

    done();
  });

  test('deleteRecord tests', async (done) => {
    const [bucketlist] = await createRecord('bucketlists', { where: {} }, bucketlistData);

    const deletedRowsCount = await deleteRecord('bucketlists', bucketlist.id);

    expect(deletedRowsCount).toEqual(1);

    done();
  });
});
