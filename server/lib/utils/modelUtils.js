const models = require('../../models');

const findById = (model, id, options) => models[model].findById(id, {
  ...options,
  plain: true,
});

const findOne = (model, options) => models[model].findOne({
  ...options,
  plain: true,
});

const findAll = (model, options) => models[model].findAll({
  ...options,
  plain: true,
});

const findAndCount = (model, options) => models[model].findAndCount({
  ...options,
  plain: true,
});

const createRecord = (model, options, defaults) => models[model].findOrCreate({
  ...options,
  plain: true,
  defaults,
});

const updateRecord = (model, options, data) => models[model].update(data, {
  ...options,
  plain: true,
});

const deleteRecord = (model, id) => models[model].destroy({
  where: { id },
});

module.exports = {
  findById,
  findOne,
  findAll,
  findAndCount,
  createRecord,
  updateRecord,
  deleteRecord,
};
