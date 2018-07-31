const { findComment } = require('../../commentHelper');
const {
  createRecord,
  getModel,
} = require('../../../utils/modelUtils');

const users = getModel('users');
const comments = getModel('comments');
const bucketlists = getModel('bucketlists');


describe('findComment tests', () => {
  test('finds a comment', async (done) => {
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

    const commentData = {
      senderId: user.id,
      content: 'dfbbdbd',
      bucketlistId: bucketlist.id,
    };

    const [{ dataValues: comment }] = await createRecord('comments', { where: {} }, commentData);

    const queryData = {
      id: comment.id,
      bucketlistId: bucketlist.id,
    };

    const foundComment = await findComment(queryData);

    expect(foundComment.content).toEqual(commentData.content);

    await users.destroy({
      where: {},
    });

    await comments.destroy({
      where: {},
    });

    await bucketlists.destroy({
      where: {},
    });

    done();
  });
});
