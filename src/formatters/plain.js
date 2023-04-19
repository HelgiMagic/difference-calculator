import isObject from 'lodash/isObject.js';

const stringify = (value) => {
  if (typeof value === 'string') return `'${value}'`;
  if (isObject(value)) return '[complex value]';
  return String(value);
};

const getPropertyName = (property, parents) => [...parents, property].join('.');

const plain = (tree1) => {
  const iter = (tree, path) => {
    const result = tree.flatMap((item) => {
      switch (item.type) {
        case 'added':
          return `Property '${getPropertyName(item.key, path)}' was added with value: ${stringify(item.value)}`;
        case 'deleted':
          return `Property '${getPropertyName(item.key, path)}' was removed`;
        case 'nested':
          return iter(item.children, [...path, item.key]);
        case 'changed':
          return `Property '${getPropertyName(item.key, path)}' was updated. From ${stringify(item.value1)} to ${stringify(item.value2)}`;
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
