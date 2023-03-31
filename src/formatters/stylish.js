import has from 'lodash/has.js';

const hasChildren = (item) => has(item, 'children');
const getName = (item) => item.name;
const getValue = (item) => item.value;
const getChange = (item) => item.isChanged;
const getChildren = (item) => item.children;
const generateSpaces = (spaceCount) => {
  if (spaceCount < 1) return '';
  return ' '.repeat(spaceCount);
};
const generateString = (item, value, space, specialSign) => {
  const name = getName(item);
  return `${space}${specialSign} ${name}: ${value}`;
};
const stylish = (treeMain) => {
  const iter = (tree, depth) => {
    const spaceCount = depth * 4 - 2;
    const closingSpaceCount = (depth - 1) * 4;
    const space = generateSpaces(spaceCount);
    const closingSpace = generateSpaces(closingSpaceCount);
    const result = tree.reduce((acc, item) => {
      const [value, changed] = getValue(item);
      const change = getChange(item);
      const itemHasChildren = hasChildren(item);
      const children = getChildren(item);
      switch (change) {
        case 'added':
          acc.push(itemHasChildren
            ? generateString(item, iter(children, depth + 1), space, '+')
            : generateString(item, value, space, '+'));
          return acc;
        case 'deleted':
          acc.push(itemHasChildren
            ? generateString(item, iter(children, depth + 1), space, '-')
            : generateString(item, value, space, '-'));
          return acc;
        case 'not changed':
          acc.push(generateString(item, value, space, ' '));
          return acc;
        case 'changed inside':
          acc.push(generateString(item, iter(children, depth + 1), space, ' '));
          return acc;
        case 'changed':
          acc.push(itemHasChildren
            ? generateString(item, iter(children, depth + 1), space, '-')
            : generateString(item, value, space, '-'));
          acc.push(itemHasChildren
            ? generateString(item, value, space, '+')
            : generateString(item, changed, space, '+'));
          return acc;
        case 'changed to obj':
          acc.push(generateString(item, value, space, '-'));
          acc.push(generateString(item, iter(children, depth + 1), space, '+'));
          return acc;
        default:
          throw new Error(`Unknown change: '${change}'!`);
      }
    }, ['{']);
    return `${result.join('\n')}\n${closingSpace}}`;
  };
  return iter(treeMain, 1);
};

export default stylish;
