import stylish from './stylish.js';
import plain from './plain.js';

const formatTree = (tree, style) => {
  switch (style) {
    case 'stylish':
      return stylish(tree);
    case 'plain':
      return plain(tree);
    default:
      throw new Error(`Unknown style: '${style}'!`);
  }
};
export default formatTree;
