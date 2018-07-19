const models = require('../../models');

const findById = (model, id, options) => models[model].findById(id, {
  ...options,
  plain: true,
});

const findOne = (model, options) => models[model].findOne({
  ...options,
  plain: true,
});

const findAll = (model, options) => models[model].findAll(options);

const findAndCount = (model, options) => models[model].findAndCount(options);

const createRecord = (model, options, defaults) => models[model].findOrCreate({
  ...options,
  plain: true,
  defaults,
});

const updateRecord = async (model, options, data) => {
  const [_, newRecord] = await models[model].update(data, { // eslint-disable-line no-unused-vars
    ...options,
    plain: true,
    returning: true,
  });
  return newRecord;
};

const deleteRecord = (model, id) => models[model].destroy({
  where: { id },
});

const getModel = model => models[model];

module.exports = {
  findById,
  findOne,
  findAll,
  findAndCount,
  createRecord,
  updateRecord,
  deleteRecord,
  getModel,
};
