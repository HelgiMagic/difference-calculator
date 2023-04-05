const normalizeValue = (value) => (typeof value === 'string' ? `'${value}'` : value);

const plain = (tree1) => {
  const iter = (tree, path) => {
    const result = tree.flatMap(({
      name, type, value, changed, children,
    }) => {
      const normName = path.length > 0 ? `${path}.${name}` : name;
      const normalizedValue = normalizeValue(value);
      const normalizedChanged = normalizeValue(changed);
      const itemHasChildren = (children !== undefined);
      switch (type) {
        case 'added':
          return itemHasChildren
            ? `Property '${normName}' was added with value: [complex value]`
            : `Property '${normName}' was added with value: ${normalizedValue}`;
        case 'deleted':
          return `Property '${normName}' was removed`;
        case 'nested':
          return iter(children, normName);
        case 'changed':
          return itemHasChildren
            ? `Property '${normName}' was updated. From [complex value] to ${normalizedValue}`
            : `Property '${normName}' was updated. From ${normalizedValue} to ${normalizedChanged}`;
        case 'changed to obj':
          return `Property '${normName}' was updated. From ${normalizedValue} to [complex value]`;
        default:
          return [];
      }
    }, []);
    return result;
  };
  return iter(tree1, '').filter(Boolean).join('\n');
};

export default plain;
