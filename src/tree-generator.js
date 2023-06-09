import isPlainObject from 'lodash/isPlainObject.js';
import has from 'lodash/has.js';
import sortBy from 'lodash/sortBy.js';
import isEqual from 'lodash/isEqual.js';

const generateComparedTree = (object1, object2) => {
  const keys = [...Object.keys(object1), ...Object.keys(object2)];
  const uniqKeys = [...new Set(keys)];
  const sortedKeys = sortBy(uniqKeys);

  return sortedKeys.map((key) => {
    if (isPlainObject(object1[key]) && isPlainObject(object2[key])) {
      return {
        key, type: 'nested', children: generateComparedTree(object1[key], object2[key]),
      };
    }

    if (!has(object2, key)) return { key, type: 'deleted', value: object1[key] };

    if (!has(object1, key)) return { key, type: 'added', value: object2[key] };

    if (isEqual(object1[key], object2[key])) return { key, type: 'unchanged', value: object1[key] };

    return {
      key, type: 'changed', value1: object1[key], value2: object2[key],
    };
  });
};

export default generateComparedTree;
