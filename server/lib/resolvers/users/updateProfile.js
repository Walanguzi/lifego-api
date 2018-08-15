const {
  updateRecord,
  asyncForEach,
  generateError,
  cancelSchedule,
  scheduleEmail,
  findById,
  getModel,
} = require('../../utils');

const Bucketlist = getModel('bucketlists');

module.exports = async (root, body, context) => {
  if (Object.keys(body).includes('displayName') && !body.displayName) {
    return generateError({
      message: 'Display name cannot be empty',
      code: 400,
    });
  }

  if (Object.keys(body).includes('privacy') && !body.privacy) {
    return generateError({
      message: 'Privacy cannot be empty',
      code: 400,
    });
  }

  const { reminders, bucketlists } = await findById('users', context.decoded.id, {
    include: [{
      model: Bucketlist,
      as: 'bucketlists',
    }],
  });

  const profile = await updateRecord('users', {
    where: {
      id: context.decoded.id,
    },
  }, body);

  if (body.reminders !== reminders) {
    await asyncForEach(bucketlists, async ({ dataValues: bucketlist }) => {
      if (body.reminders === true) {
        if (bucketlist.jobId) {
          const { data: { id } } = await scheduleEmail({ bucketlist, context });

          await updateRecord('bucketlists', {
            where: { id: bucketlist.id },
          }, {
            jobId: id,
          });
        }
      } else if (bucketlist.jobId) {
        await cancelSchedule(bucketlist.jobId);
      }
    });
  }

  return profile;
};
