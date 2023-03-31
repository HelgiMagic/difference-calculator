import has from 'lodash/has.js';

const hasChildren = (item) => has(item, 'children');
const getName = (item) => item.name;
const getValue = (item) => item.value;
const getChange = (item) => item.isChanged;
const getChildren = (item) => item.children;
const normalizeValue = (value) => (typeof value === 'string' ? `'${value}'` : value);

const plain = (tree1) => {
  const iter = (tree, path) => {
    const result = tree.flatMap((item) => {
      const name = path.length > 0 ? `${path}.${getName(item)}` : getName(item);
      const change = getChange(item);
      const [value, changed] = getValue(item);
      const normalizedValue = normalizeValue(value);
      const normalizedChanged = normalizeValue(changed);
      const itemHasChildren = hasChildren(item);
      const children = getChildren(item);
      switch (change) {
        case 'added':
          return itemHasChildren
            ? `Property '${name}' was added with value: [complex value]`
            : `Property '${name}' was added with value: ${normalizedValue}`;
        case 'deleted':
          return `Property '${name}' was removed`;
        case 'changed inside':
          return iter(children, name);
        case 'changed':
          return itemHasChildren
            ? `Property '${name}' was updated. From [complex value] to ${normalizedValue}`
            : `Property '${name}' was updated. From ${normalizedValue} to ${normalizedChanged}`;
        case 'changed to obj':
          return `Property '${name}' was updated. From ${normalizedValue} to [complex value]`;
        default:
          return [];
      }
    }, []);
    return result;
  };
  return iter(tree1, '').filter(Boolean).join('\n');
};

export default plain;
