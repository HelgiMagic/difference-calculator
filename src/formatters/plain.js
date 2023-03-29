import has from 'lodash/has.js';

const hasChildren = (item) => has(item, 'children');
const getName = (item) => item.name;
const getValue = (item) => item.value;
const getChange = (item) => item.isChanged;
const getChildren = (item) => item.children;

const plain = (tree1) => {
  const iter = (tree, path) => {
    let string;
    const result = tree.flatMap((item) => {
      const name = path.length > 0 ? `${path}.${getName(item)}` : getName(item);
      const change = getChange(item);
      let [value, changed] = getValue(item);
      if (typeof value === 'string') value = `'${value}'`;
      if (typeof changed === 'string') changed = `'${changed}'`;
      const itemHasChildren = hasChildren(item);
      const children = getChildren(item);
      switch (change) {
        case 'added':
          string = itemHasChildren
            ? `Property '${name}' was added with value: [complex value]`
            : `Property '${name}' was added with value: ${value}`;
          return string;
        case 'deleted':
          string = `Property '${name}' was removed`;
          return string;
        case 'changed inside':
          string = iter(children, name);
          return string;
        case 'changed':
          string = itemHasChildren
            ? `Property '${name}' was updated. From [complex value] to ${value}`
            : `Property '${name}' was updated. From ${value} to ${changed}`;
          return string;
        case 'changed to obj':
          string = `Property '${name}' was updated. From ${value} to [complex value]`;
          return string;
        default:
          return [];
      }
    }, []);
    return result;
  };
  return iter(tree1, '').filter(Boolean).join('\n');
};

export default plain;
