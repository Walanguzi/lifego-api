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

describe('Model utils tests', () => {
  let bucketlist;

  const bucketlistData = {
    name: 'test',
    createdBy: 'test user',
    privacy: 'everyone',
  };

  const user = {
    displayName: 'test user',
    email: 'test@user.com',
    password: 'fgfvsvd',
    privacy: 'friends',
  };

  beforeAll(async (done) => {
    const [{ id }] = await createRecord('users', { where: {} }, user);

    bucketlistData.userId = id;

    [bucketlist] = await createRecord('bucketlists', { where: {} }, bucketlistData);

    expect(bucketlist).toHaveProperty('id');
    expect(bucketlist.name).toEqual(bucketlistData.name);

    done();
  });

  afterAll(async (done) => {
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
    const buck = await findById('bucketlists', bucketlist.id);

    expect(buck.name).toEqual(bucketlist.name);

    done();
  });

  test('findOne tests', async (done) => {
    const buck = await findOne('bucketlists', {
      where: { id: bucketlist.id },
    });

    expect(buck.name).toEqual(bucketlist.name);

    done();
  });

  test('findAll tests', async (done) => {
    const [buck] = await findAll('bucketlists', {});

    expect(buck.name).toEqual(bucketlist.name);

    done();
  });

  test('findAndCount tests', async (done) => {
    const { count, rows: [buck] } = await findAndCount('bucketlists', {});

    expect(count).toEqual(1);
    expect(buck.name).toEqual(bucketlist.name);

    done();
  });

  test('updateRecord tests', async (done) => {
    const body = { name: 'updated name' };

    const buck = await updateRecord('bucketlists', {
      where: { id: bucketlist.id },
    }, body);

    expect(buck.name).toEqual(body.name);

    done();
  });

  test('deleteRecord tests', async (done) => {
    const deletedRowsCount = await deleteRecord('bucketlists', bucketlist.id);

    expect(deletedRowsCount).toEqual(1);

    done();
  });
});
