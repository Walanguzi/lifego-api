const { findById, generateError } = require('../../utils');
const { getAssociationOptions, addUserProperties } = require('../../helpers/bucketlistHelper');

module.exports = async (root, body) => {
  const associationOptions = getAssociationOptions();
  const bucketlist = await findById('bucketlists', body.id, associationOptions);
  if (bucketlist) {
    return addUserProperties(bucketlist);
  }
  return generateError({
    message: 'Bucketlist not found',
    code: 404,
  });
};
