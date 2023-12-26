import _ from 'lodash';

const stringify = (value) => {
  if (!_.isObject(value)) {
    return _.isString(value) ? `'${value}'` : `${value}`;
  }
  return '[complex value]';
};

const toPlain = (tree) => {
  const iter = (node, path) => {
    const data = node.flatMap((item) => {
      switch (item.type) {
        case 'nested':
          return iter(item.children, `${path}${item.key}.`);
        case 'added':
          return `Property '${path}${item.key}' was added with value: ${stringify(item.value)}`;
        case 'deleted':
          return `Property '${path}${item.key}' was removed`;
        case 'unchanged':
          return [];
        case 'changed':
          return `Property '${path}${item.key}' was updated. From ${stringify(item.value1)} to ${stringify(item.value2)}`;
        default:
          throw new Error(`Type ${item.type} is not allowed!`);
      }
    });
    return data.join('\n');
  };
  return iter(tree, '');
};

export default toPlain;
