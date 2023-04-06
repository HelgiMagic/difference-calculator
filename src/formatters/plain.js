const normalizeValue = (value) => {
  if (typeof value === 'string') return `'${value}'`;
  if (Array.isArray(value)) return '[complex value]';
  return value;
};

const plain = (tree1) => {
  const iter = (tree, path) => {
    const result = tree.flatMap(({
      name, type, value, changed, children,
    }) => {
      const normName = path.length > 0 ? `${path}.${name}` : name;
      const normalizedValue = normalizeValue(value);
      const normalizedChanged = normalizeValue(changed);
      switch (type) {
        case 'added':
          return `Property '${normName}' was added with value: ${normalizedValue}`;
        case 'deleted':
          return `Property '${normName}' was removed`;
        case 'nested':
          return iter(children, normName);
        case 'changed':
          return `Property '${normName}' was updated. From ${normalizedValue} to ${normalizedChanged}`;
        default:
          return [];
      }
    }, []);
    return result;
  };
  return iter(tree1, '').filter(Boolean).join('\n');
};

export default plain;
