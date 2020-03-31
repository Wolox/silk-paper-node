const { symbols, specPaths } = require('../constants');

exports.createDescription = data => `${data.method} ${data.path}`;

exports.getPathByType = (data, type) =>
  ({
    response: `${data.path}.${data.method}.${specPaths.RESPONSES}.${data.statusCode}`,
    request: `${data.path}.${data.method}.${specPaths.REQUEST_BODY}`
  }[type]);

const pathToCamelCase = path =>
  path.replace(/(\/|\/:)[a-z]/gi, idx =>
    idx
      .replace(symbols.SLASH, '')
      .replace(symbols.COLON, '')
      .toUpperCase()
  );

exports.generateSchemaName = (data, type) =>
  `${data.method}${pathToCamelCase(data.path)}${data.statusCode}_${type}`;
