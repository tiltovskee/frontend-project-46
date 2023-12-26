import _ from 'lodash';

const makeTree = (fileData1, fileData2) => {
  const keys = _.union(_.keys(fileData1), _.keys(fileData2));
  const tree = keys.map((key) => {
    if (_.isObject(fileData1[key]) && _.isObject(fileData2[key])) {
      return { key, type: 'nested', children: makeTree(fileData1[key], fileData2[key]) };
    }
    if (!Object.hasOwn(fileData1, key)) {
      return { key, value: fileData2[key], type: 'added' };
    }
    if (!Object.hasOwn(fileData2, key)) {
      return { key, value: fileData1[key], type: 'deleted' };
    }
    if (_.isEqual(fileData1[key], fileData2[key])) {
      return { key, value: fileData1[key], type: 'unchanged' };
    }
    return {
      key,
      value1: fileData1[key],
      value2: fileData2[key],
      type: 'changed',
    };
  });
  return _.sortBy(tree, 'key');
};

export default makeTree;
