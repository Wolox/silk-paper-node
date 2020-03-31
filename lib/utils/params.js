const { set } = require('./objects');
const { generateOpenApiSchema } = require('../specification/gen_schema');
const { paramTypes, specPaths } = require('../constants');

const updateParamsList = (params, name, type) => paramsList => {
  const existingParam = paramsList.find(param => param.name === name && param.in === type);
  if (existingParam) {
    return paramsList;
  }
  paramsList.push({
    in: type,
    name,
    required: false,
    schema: generateOpenApiSchema(params[name])
  });
  return paramsList;
};

const addParams = (spec, data, params = {}, type) => {
  const paramsPath = `${data.path}.${data.method}.${specPaths.PARAMETERS}`;
  Object.keys(params).forEach(name => {
    set(spec, paramsPath, updateParamsList(params, name, type));
  });
};

const addAllParams = (spec, data) => {
  addParams(spec, data, data.queryParams, paramTypes.QUERY);
  addParams(spec, data, data.pathParams, paramTypes.PATH);
  addParams(spec, data, data.reqHeaders, paramTypes.HEADERS);
};

module.exports = {
  addAllParams
};
