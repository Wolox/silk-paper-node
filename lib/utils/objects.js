exports.set = (obj, path, modifier) => {
  const pList = path.split('.');
  const target = pList.pop();
  const pointer = pList.reduce((prevNode, currentNode) => {
    if (!prevNode[currentNode]) prevNode[currentNode] = {};
    return prevNode[currentNode];
  }, obj);

  pointer[target] = typeof modifier === 'function' ? modifier(pointer[target]) : modifier;
};

exports.addPrototype = obj => JSON.parse(JSON.stringify(obj));
