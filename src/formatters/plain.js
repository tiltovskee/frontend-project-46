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
      const {
        key,
        status,
        children,
        value,
        valueBefore,
        valueAfter,
      } = item;
      switch (status) {
        case 'nested':
          return iter(children, `${path}${key}.`);
        case 'added':
          return `Property '${path}${key}' was added with value: ${stringify(value)}`;
        case 'deleted':
          return `Property '${path}${key}' was removed`;
        case 'unchanged':
          return [];
        case 'changed':
          return `Property '${path}${key}' was updated. From ${stringify(valueBefore)} to ${stringify(valueAfter)}`;
        default:
          throw new Error(`Status ${status} not allowed!`);
      }
    });
    return data.join('\n');
  };
  return iter(tree, '');
};

export default toPlain;
