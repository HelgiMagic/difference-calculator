import has from 'lodash/has.js';

const hasChildren = (item) => has(item, 'children');
const getName = (item) => item.name;
const getValue = (item) => item.value;
const getChange = (item) => item.isChanged;
const getDepth = (item) => item.depth;
const getChildren = (item) => item.children;
const generateSpaces = (spaceCount) => ' '.repeat(spaceCount);
const generateString = (item, value, specialSign) => {
  const name = getName(item);
  const depth = getDepth(item);
  const spaceCount = depth * 4 - 2;
  const space = generateSpaces(spaceCount);
  return `${space}${specialSign} ${name}: ${value}`;
};
const stylish = (tree) => {
  let closingSpace;
  const result = tree.reduce((acc, item) => {
    const [value, changed] = getValue(item);
    const change = getChange(item);
    const itemHasChildren = hasChildren(item);
    const children = getChildren(item);

    const closingSpaceCount = (getDepth(item) - 1) * 4;
    closingSpace = generateSpaces(closingSpaceCount);
    switch (change) {
      case 'added':
        acc.push(itemHasChildren
          ? generateString(item, stylish(children), '+')
          : generateString(item, value, '+'));
        return acc;
      case 'deleted':
        acc.push(itemHasChildren
          ? generateString(item, stylish(children), '-')
          : generateString(item, value, '-'));
        return acc;
      case 'not changed':
        acc.push(generateString(item, value, ' '));
        return acc;
      case 'changed inside':
        acc.push(generateString(item, stylish(children), ' '));
        return acc;
      case 'changed':
        acc.push(itemHasChildren
          ? generateString(item, stylish(children), '-')
          : generateString(item, value, '-'));
        acc.push(itemHasChildren
          ? generateString(item, value, '+')
          : generateString(item, changed, '+'));
        return acc;
      case 'changed to obj':
        acc.push(generateString(item, value, '-'));
        acc.push(generateString(item, stylish(children), '+'));
        return acc;
      default:
        throw new Error(`Unknown change: '${change}'!`);
    }
  }, ['{']);
  return `${result.join('\n')}\n${closingSpace}}`;
};

export default stylish;
