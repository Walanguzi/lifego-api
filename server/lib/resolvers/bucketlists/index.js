const createBucketlist = require('./create');
const getBucketlist = require('./getOne');
const list = require('./list');
const explore = require('./explore');
const listAll = require('./listAll');
const listOther = require('./listOther');
const updateBucketlist = require('./update');
const deleteBucketlist = require('./delete');

module.exports = {
  createBucketlist,
  getBucketlist,
  list,
  explore,
  listAll,
  listOther,
  updateBucketlist,
  deleteBucketlist,
};
