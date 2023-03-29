import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatTree = (tree, style) => {
  switch (style) {
    case 'stylish':
      return stylish(tree);
    case 'plain':
      return plain(tree);
    case 'json':
      return json(tree);
    default:
      throw new Error(`Unknown style: '${style}'!`);
  }
};
export default formatTree;
