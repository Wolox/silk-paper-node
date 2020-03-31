/* eslint-disable no-underscore-dangle */
const { createFile, fileExists } = require('../utils/files');
const { initGeneralSpecification, initPathSpecification } = require('../utils/specification');
const { specPaths } = require('../constants');

const createGeneralSpecification = options => {
  const specPath = `${process.cwd()}/${options.docsDir}/${specPaths.SPECIFICATION}.${options.fileType}`;
  if (!fileExists(specPath)) {
    const spec = initGeneralSpecification(options);
    createFile(specPath, JSON.stringify(spec, null, 2));
  }
};

const createSpecForEndpoints = (server, options) => {
  server._router.stack.forEach(endpoint => {
    if (endpoint.route) {
      const { path } = endpoint.route;
      const method = Object.keys(endpoint.route.methods).pop();
      const specPath = `${process.cwd()}/${options.docsDir}${path}/${method}.${options.fileType}`;
      if (!fileExists(specPath)) {
        const spec = initPathSpecification({ method, path });
        createFile(specPath, JSON.stringify(spec, null, 2));
      }
    }
  });
};

exports.generateInitialSpecs = (server, options = {}) => {
  createGeneralSpecification(options);
  createSpecForEndpoints(server, options);
};
