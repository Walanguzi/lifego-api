const { Bucketlist } = require('../../../models');

module.exports = async (root, body) => {
  const bucketlist = await Bucketlist.findOne({
    where: { id: body.id },
    plain: true,
  });
  if (bucketlist) return bucketlist;
  return Object.assign(new Error('Bucketlist not found'), { extensions: { code: 404 } });
};
