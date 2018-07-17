const { Bucketlist } = require('../../../models');

module.exports = async (root, body) => {
  const bucketlist = await Bucketlist.findOne({
    where: { id: body.id },
    plain: true,
  });
  return bucketlist;
};
