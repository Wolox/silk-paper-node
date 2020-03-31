/* eslint-disable no-negated-condition */
const { readFile, readDir, isDirectory } = require('../utils/files');
const { addSchemas } = require('../utils/schemas');
const { specPaths } = require('../constants');
const { set } = require('../utils/objects');

const requireAllSpecFiles = (specification, pathToSearch, fileType) => {
  readDir(pathToSearch).forEach(file => {
    const filePath = `${pathToSearch}/${file}`;
    if (isDirectory(filePath)) {
      requireAllSpecFiles(specification, filePath, fileType);
    } else if (file !== `${specPaths.SPECIFICATION}.${fileType}`) {
      const specFile = readFile(filePath);
      set(specification, `${specPaths.PATHS}.${Object.keys(specFile)[0]}`, Object.values(specFile)[0]);
      set(specification, specPaths.COMP_SCHEMAS, addSchemas(specFile.components.schemas));
    }
  });
};

exports.buildSpecObject = options => {
  const normalizedPath = `${process.cwd()}/${options.docsDir}`;
  const specPath = `${normalizedPath}/${specPaths.SPECIFICATION}.${options.fileType}`;
  const specification = readFile(specPath);

  requireAllSpecFiles(specification, normalizedPath, options.fileType);

  return specification;
};
