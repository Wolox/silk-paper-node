const { createDescription } = require('./data');
const { generateAndAddBodychema } = require('./schemas');
const { addAllParams } = require('./params');
const { readFile } = require('./files');
const { schemaTypes, EXAMPLE_SERVER_DESCRIPTION, EXAMPLE_SERVER_URL, PACKAGE_JSON } = require('../constants');

exports.initGeneralSpecification = options => {
  const packageJson = readFile(`${process.cwd()}/${PACKAGE_JSON}`);

  return {
    openapi: options.openapi,
    info: {
      title: packageJson.name,
      description: packageJson.description,
      version: packageJson.version
    },
    servers: [
      {
        url: EXAMPLE_SERVER_URL,
        description: EXAMPLE_SERVER_DESCRIPTION
      }
    ]
  };
};

exports.initPathSpecification = data => ({
  [data.path]: {
    [data.method]: {
      description: createDescription(data),
      parameters: []
    }
  },
  components: { schemas: {} }
});

exports.createSpecification = data => {
  const spec = this.initPathSpecification(data);

  generateAndAddBodychema(spec, data, schemaTypes.REQUEST);
  generateAndAddBodychema(spec, data, schemaTypes.RESPONSE);
  addAllParams(spec, data);

  return spec;
};

exports.updateSpecification = (spec, data) => {
  generateAndAddBodychema(spec, data, schemaTypes.REQUEST);
  generateAndAddBodychema(spec, data, schemaTypes.RESPONSE);
  addAllParams(spec, data);
};
