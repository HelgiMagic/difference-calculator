import { cwd } from 'process';
import path from 'path';
import has from 'lodash/has.js';
import fs from 'fs';
import convertToObject from './parsers.js';

const isAbsolute = (filepath) => filepath.startsWith('/');
const normalizeFilePath = (filepath) => {
  if (isAbsolute(filepath)) return filepath;
  return path.resolve(cwd(), filepath);
};
const hasChildren = (node) => has(node, 'children');
const isObject = (value) => typeof value === 'object' && value !== null && !Array.isArray(value);
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
const generateComparedTree = (obj1, obj2) => {
  const iter = (object1, object2, depth) => {
    const keys = [...new Set([...Object.keys(object1), ...Object.keys(object2)])].sort();

    const result = keys.map((key) => {
      let isChanged;
      const value = [];
      if (isObject(object1[key]) && isObject(object2[key])) {
        return {
          name: key, isChanged: 'changed inside', value, depth, children: iter(object1[key], object2[key], depth + 1),
        };
      } if (isObject(object1[key]) && has(object2, key)) {
        return {
          name: key, isChanged: 'changed', value: [object2[key]], depth, children: iter(object1[key], object1[key], depth + 1),
        };
      } if (isObject(object1[key])) {
        return {
          name: key, isChanged: 'deleted', value, depth, children: iter(object1[key], object1[key], depth + 1),
        };
      } if (isObject(object2[key])) {
        return {
          name: key, isChanged: 'added', value, depth, children: iter(object2[key], object2[key], depth + 1),
        };
      }
      if (has(object1, key) && !has(object2, key)) {
        isChanged = 'deleted';
        value.push(object1[key]);
      } else if (!has(object1, key) && has(object2, key)) {
        isChanged = 'added';
        value.push(object2[key]);
      } else if (object1[key] === object2[key]) {
        isChanged = 'not changed';
        value.push(object1[key]);
      } else if (object1[key] !== object2[key]) {
        isChanged = 'changed';
        value.push(object1[key]);
        value.push(object2[key]);
      }
      return {
        name: key,
        isChanged,
        value,
        depth,
      };
    });

    return result;
  };
  return iter(obj1, obj2, 1);
};

const formatTree = (tree, style) => {
  if (style === 'stylish') {
    let space;
    let closingSpace;
    const result = tree.reduce((acc, item) => {
      const name = getName(item);
      const [value, changed] = getValue(item);
      const change = getChange(item);
      const depth = getDepth(item);
      const spaceCount = depth * 4 - 2;
      const closingSpaceCount = (depth - 1) * 4;
      const itemHasChildren = hasChildren(item);
      const children = getChildren(item);
      space = generateSpaces(spaceCount);
      closingSpace = generateSpaces(closingSpaceCount);
      let string;
      let secondString;
      switch (change) {
        case 'added':
          string = itemHasChildren ? `${space}+ ${name}: ${formatTree(children, style)}` : `${space}+ ${name}: ${value}`;
          acc.push(string);
          return acc;
        case 'deleted':
          string = itemHasChildren ? `${space}- ${name}: ${formatTree(children, style)}` : `${space}- ${name}: ${value}`;
          acc.push(string);
          return acc;
        case 'not changed':
          string = `${space}  ${name}: ${value}`;
          acc.push(string);
          return acc;
        case 'changed inside':
          string = `${space}  ${name}: ${formatTree(children, style)}`;
          acc.push(string);
          return acc;
        case 'changed':
          string = itemHasChildren ? `${space}- ${name}: ${formatTree(children, style)}` : `${space}- ${name}: ${value}`;
          secondString = itemHasChildren ? `${space}+ ${name}: ${value}` : `${space}+ ${name}: ${changed}`;
          acc.push(string);
          acc.push(secondString);
          return acc;
        default:
          throw new Error(`Unknown change: '${change}'!`);
      }
    }, ['{']);
    return `${result.join('\n')}\n${closingSpace}}`;
  }
  return 'unknown format';
};

const genDiff = (filepath1, filepath2, format) => {
  const normFilepath1 = normalizeFilePath(filepath1);
  const normFilepath2 = normalizeFilePath(filepath2);
  const file1 = fs.readFileSync(normFilepath1);
  const file2 = fs.readFileSync(normFilepath2);
  const object1 = convertToObject(normFilepath1, file1);
  const object2 = convertToObject(normFilepath2, file2);
  const tree = generateComparedTree(object1, object2);
  const result = formatTree(tree, format);
  console.log(result);
  return result;
};

export default genDiff;
