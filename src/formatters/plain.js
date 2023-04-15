import isObject from 'lodash/isObject.js';

const stringify = (value) => {
  if (typeof value === 'string') return `'${value}'`;
  if (isObject(value)) return '[complex value]';
  return `${value}`;
};

const plain = (tree1) => {
  const iter = (tree, path) => {
    const result = tree.flatMap((item) => {
      const newPath = [...path, item.key];
      const normName = newPath.join('.');
      switch (item.type) {
        case 'added':
          return `Property '${normName}' was added with value: ${stringify(item.value)}`;
        case 'deleted':
          return `Property '${normName}' was removed`;
        case 'nested':
          return iter(item.children, newPath);
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
  return iter(tree1, []).filter(Boolean).join('\n');
};

export default plain;
