import isObject from 'lodash/isObject';

const generateSpaces = (depth, isClosing) => {
  const spaceCount = isClosing ? depth * 4 : depth * 4 - 2;
  return ' '.repeat(spaceCount);
};

const generateString = (name, value, depth, specialSign) => {
  if (!isObject(value)) {
    const space = generateSpaces(depth);
    return `${space}${specialSign} ${name}: ${value}`;
  }
  const keys = Object.keys(value);
  const result = keys.map((key) => generateString(key, value[key], depth + 1, ' '));
  const newValue = `{\n${result.join('\n')}\n${generateSpaces(depth, true)}}`;
  return generateString(name, newValue, depth, specialSign);
};

const stylish = (treeMain) => {
  const iter = (tree, depth) => {
    const result = tree.flatMap((item) => {
      switch (item.type) {
        case 'added':
          return generateString(item.key, item.value1, depth, '+');
        case 'deleted':
          return generateString(item.key, item.value1, depth, '-');
        case 'unchanged':
          return generateString(item.key, item.value1, depth, ' ');
        case 'nested':
          return generateString(item.key, iter(item.children, depth + 1), depth, ' ');
        case 'changed':
          return [
            generateString(item.key, item.value1, depth, '-'),
            generateString(item.key, item.value2, depth, '+')];
        default:
          throw new Error(`Unknown change: '${item.type}'!`);
      }
    });
    return `{\n${result.join('\n')}\n${generateSpaces(depth - 1, true)}}`;
  };
  return iter(treeMain, 1);
};

export default stylish;
