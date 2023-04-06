/* eslint-disable no-case-declarations */
const generateSpaces = (spaceCount) => {
  if (spaceCount < 1) return '';
  return ' '.repeat(spaceCount);
};

const generateString = (name, value, space, specialSign) => `${space}${specialSign} ${name}: ${value}`;
const stylish = (treeMain) => {
  const iter = (tree, depth) => {
    if (!Array.isArray(tree)) return tree;
    const spaceCount = depth * 4 - 2;
    const closingSpaceCount = (depth - 1) * 4;
    const space = generateSpaces(spaceCount);
    const closingSpace = generateSpaces(closingSpaceCount);
    const result = tree.reduce((acc, {
      name, type, value, changed, children,
    }) => {
      switch (type) {
        case 'added':
          return [...acc, generateString(name, iter(value, depth + 1), space, '+')];
        case 'deleted':
          return [...acc, generateString(name, iter(value, depth + 1), space, '-')];
        case 'not changed':
          return [...acc, generateString(name, value, space, ' ')];
        case 'nested':
          return [...acc, generateString(name, iter(children, depth + 1), space, ' ')];
        case 'changed':
          const string = generateString(name, iter(value, depth + 1), space, '-');
          const secondString = generateString(name, iter(changed, depth + 1), space, '+');
          return [...acc, string, secondString];
        default:
          throw new Error(`Unknown change: '${type}'!`);
      }
    }, ['{']);
    return `${result.join('\n')}\n${closingSpace}}`;
  };
  return iter(treeMain, 1);
};

export default stylish;
