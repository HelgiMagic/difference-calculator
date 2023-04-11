import isObject from 'lodash/isObject.js';

const stringify = (value) => {
  if (typeof value === 'string') return `'${value}'`;
  if (isObject(value)) return '[complex value]';
  return value;
};

const plain = (tree1) => {
  const iter = (tree, path) => {
    const result = tree.flatMap((item) => {
      const normName = path.length > 0 ? `${path}.${item.key}` : item.key;
      switch (item.type) {
        case 'added':
          return `Property '${normName}' was added with value: ${stringify(item.value1)}`;
        case 'deleted':
          return `Property '${normName}' was removed`;
        case 'nested':
          return iter(item.children, normName);
        case 'changed':
          return `Property '${normName}' was updated. From ${stringify(item.value1)} to ${stringify(item.value2)}`;
        case 'unchanged':
          return null;
        default:
          throw new Error(`Unknown type: '${item.type}'!`);
      }
    }, []);
    return result;
  };
  return iter(tree1, '').filter(Boolean).join('\n');
};

export default plain;
