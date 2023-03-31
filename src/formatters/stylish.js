/* eslint-disable no-case-declarations */
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
          const addString = itemHasChildren
            ? generateString(item, iter(children, depth + 1), space, '+')
            : generateString(item, value, space, '+');
          return [...acc, addString];
        case 'deleted':
          const delString = itemHasChildren
            ? generateString(item, iter(children, depth + 1), space, '-')
            : generateString(item, value, space, '-');
          return [...acc, delString];
        case 'not changed':
          return [...acc, generateString(item, value, space, ' ')];
        case 'changed inside':
          return [...acc, generateString(item, iter(children, depth + 1), space, ' ')];
        case 'changed':
          const string = itemHasChildren
            ? generateString(item, iter(children, depth + 1), space, '-')
            : generateString(item, value, space, '-');
          const secondString = itemHasChildren
            ? generateString(item, value, space, '+')
            : generateString(item, changed, space, '+');
          return [...acc, string, secondString];
        case 'changed to obj':
          const valString = generateString(item, value, space, '-');
          const objString = generateString(item, iter(children, depth + 1), space, '+');
          return [...acc, valString, objString];
        default:
          throw new Error(`Unknown change: '${change}'!`);
      }
    }, ['{']);
    return `${result.join('\n')}\n${closingSpace}}`;
  };
  return iter(treeMain, 1);
};

export default stylish;
