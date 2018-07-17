const { bucketlists: Bucketlist } = require('../../../models');

module.exports = async (root, { id }) => {
  await Bucketlist.destroy({
    where: { id },
  });

  return {
    message: 'success',
  };
};
