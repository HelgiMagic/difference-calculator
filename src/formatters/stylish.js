import has from 'lodash/has.js';

const hasChildren = (item) => has(item, 'children');
const getName = (item) => item.name;
const getValue = (item) => item.value;
const getChange = (item) => item.isChanged;
const getDepth = (item) => item.depth;
const getChildren = (item) => item.children;
const generateSpaces = (spaceCount) => {
  const result = [];
  for (let i = 0; i < spaceCount; i += 1) {
    result.push(' ');
  }
  return result.join('');
};
const stylish = (tree) => {
  let space;
  let closingSpace;
  const result = tree.reduce((acc, item) => {
    const name = getName(item);
    const [value, changed] = getValue(item);
    const change = getChange(item);
    const depth = getDepth(item);
    const itemHasChildren = hasChildren(item);
    const children = getChildren(item);
    const spaceCount = depth * 4 - 2;
    const closingSpaceCount = (depth - 1) * 4;
    space = generateSpaces(spaceCount);
    closingSpace = generateSpaces(closingSpaceCount);
    let string;
    let secondString;
    switch (change) {
      case 'added':
        string = itemHasChildren ? `${space}+ ${name}: ${stylish(children)}` : `${space}+ ${name}: ${value}`;
        acc.push(string);
        return acc;
      case 'deleted':
        string = itemHasChildren ? `${space}- ${name}: ${stylish(children)}` : `${space}- ${name}: ${value}`;
        acc.push(string);
        return acc;
      case 'not changed':
        string = `${space}  ${name}: ${value}`;
        acc.push(string);
        return acc;
      case 'changed inside':
        string = `${space}  ${name}: ${stylish(children)}`;
        acc.push(string);
        return acc;
      case 'changed':
        string = itemHasChildren ? `${space}- ${name}: ${stylish(children)}` : `${space}- ${name}: ${value}`;
        secondString = itemHasChildren ? `${space}+ ${name}: ${value}` : `${space}+ ${name}: ${changed}`;
        acc.push(string);
        acc.push(secondString);
        return acc;
      case 'changed to obj':
        string = `${space}- ${name}: ${value}`;
        secondString = `${space}+ ${name}: ${stylish(children)}`;
        acc.push(string);
        acc.push(secondString);
        return acc;
      default:
        throw new Error(`Unknown change: '${change}'!`);
    }
  }, ['{']);
  return `${result.join('\n')}\n${closingSpace}}`;
};

export default stylish;
