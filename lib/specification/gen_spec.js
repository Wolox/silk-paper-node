const { createSpecification, updateSpecification } = require('../utils/specification');
const { createFile, pathExists, readFile } = require('../utils/files');
const { extractDataFromresponse } = require('../utils/extractors');

exports.generateSpec = (response, options) => {
  const data = extractDataFromresponse(response, options);
  // TODO: move this to a fnc.
  const specPath = `${process.cwd()}/${options.docsDir}${data.path}/${data.method}.${options.fileType}`;

  let spec = {};
  if (pathExists(specPath)) {
    spec = readFile(specPath);
    updateSpecification(spec, data);
  } else {
    spec = createSpecification(data);
  }
  createFile(specPath, `${JSON.stringify(spec, undefined, 2)}\n`);
};
