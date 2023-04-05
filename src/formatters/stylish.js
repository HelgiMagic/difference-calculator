/* eslint-disable no-case-declarations */
const generateSpaces = (spaceCount) => {
  if (spaceCount < 1) return '';
  return ' '.repeat(spaceCount);
};

const generateString = (name, value, space, specialSign) => `${space}${specialSign} ${name}: ${value}`;
const stylish = (treeMain) => {
  const iter = (tree, depth) => {
    const spaceCount = depth * 4 - 2;
    const closingSpaceCount = (depth - 1) * 4;
    const space = generateSpaces(spaceCount);
    const closingSpace = generateSpaces(closingSpaceCount);
    const result = tree.reduce((acc, {
      name, type, value, changed, children,
    }) => {
      const itemHasChildren = (children !== undefined);
      switch (type) {
        case 'added':
          const addString = itemHasChildren
            ? generateString(name, iter(children, depth + 1), space, '+')
            : generateString(name, value, space, '+');
          return [...acc, addString];
        case 'deleted':
          const delString = itemHasChildren
            ? generateString(name, iter(children, depth + 1), space, '-')
            : generateString(name, value, space, '-');
          return [...acc, delString];
        case 'not changed':
          return [...acc, generateString(name, value, space, ' ')];
        case 'nested':
          return [...acc, generateString(name, iter(children, depth + 1), space, ' ')];
        case 'changed':
          const string = itemHasChildren
            ? generateString(name, iter(children, depth + 1), space, '-')
            : generateString(name, value, space, '-');
          const secondString = itemHasChildren
            ? generateString(name, value, space, '+')
            : generateString(name, changed, space, '+');
          return [...acc, string, secondString];
        case 'changed to obj':
          const valString = generateString(name, value, space, '-');
          const objString = generateString(name, iter(children, depth + 1), space, '+');
          return [...acc, valString, objString];
        default:
          throw new Error(`Unknown change: '${type}'!`);
      }
    }, ['{']);
    return `${result.join('\n')}\n${closingSpace}}`;
  };
  return iter(treeMain, 1);
};

export default stylish;
