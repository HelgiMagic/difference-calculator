import isObject from 'lodash/isObject.js';
import has from 'lodash/has.js';
import sortBy from 'lodash/sortBy.js';

const generateComparedTree = (object1, object2) => {
  const keys = [...new Set([...Object.keys(object1), ...Object.keys(object2)])];
  const normKeys = sortBy(keys);

  const result = normKeys.map((key) => {
    if (isObject(object1[key]) && isObject(object2[key])) {
      return {
        name: key, type: 'nested', children: generateComparedTree(object1[key], object2[key]),
      };
    } if (isObject(object1[key]) && has(object2, key)) {
      return {
        name: key, type: 'changed', value: object2[key], children: generateComparedTree(object1[key], object1[key]),
      };
    } if (has(object1, key) && isObject(object2[key])) {
      return {
        name: key, type: 'changed to obj', value: object1[key], children: generateComparedTree(object2[key], object2[key]),
      };
    } if (isObject(object1[key])) {
      return {
        name: key, type: 'deleted', children: generateComparedTree(object1[key], object1[key]),
      };
    } if (isObject(object2[key])) {
      return {
        name: key, type: 'added', children: generateComparedTree(object2[key], object2[key]),
      };
    }
    if (has(object1, key) && !has(object2, key)) {
      return {
        name: key,
        type: 'deleted',
        value: object1[key],
      };
    } if (!has(object1, key) && has(object2, key)) {
      return {
        name: key,
        type: 'added',
        value: object2[key],
      };
    } if (object1[key] === object2[key]) {
      return {
        name: key,
        type: 'not changed',
        value: object1[key],
      };
    } if (object1[key] !== object2[key]) {
      return {
        name: key,
        type: 'changed',
        value: object1[key],
        changed: object2[key],
      };
    }
    return 'error';
  });

  return result;
};

export default generateComparedTree;
