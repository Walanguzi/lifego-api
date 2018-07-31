const { findLike } = require('../../likeHelper');
const {
  createRecord,
  getModel,
} = require('../../../utils/modelUtils');

const users = getModel('users');
const likes = getModel('likes');
const bucketlists = getModel('bucketlists');


describe('findLike tests', () => {
  test('finds a like', async (done) => {
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

    const likeData = {
      name: 'dfbbdbd',
      likerId: user.id,
      bucketlistId: bucketlist.id,
    };

    const [{ dataValues: like }] = await createRecord('likes', { where: {} }, likeData);

    const context = {
      decoded: { id: user.id },
    };

    const foundLike = await findLike(like.id, context);

    expect(foundLike.likerId).toEqual(likeData.likerId);

    await users.destroy({
      where: {},
    });

    await likes.destroy({
      where: {},
    });

    await bucketlists.destroy({
      where: {},
    });

    done();
  });
});
