/* eslint-disable no-underscore-dangle */
const qs = require('querystring');

const { addPrototype } = require('./objects');
const { specPaths, symbols } = require('../constants');

// TODO: Maybe also check if the path is in the list? not sure what to do if not.
const extractPathParams = (rawPath, paths) => {
  const paramRegex = /:([\w\d_-]+)/gi;
  const pathParams = {};
  const foundPath = paths.find(path => {
    const params = path.match(paramRegex);
    if (params) {
      const pathRegex = new RegExp(`^${path.replace(paramRegex, '([\\w\\d_-]+)')}$`);
      const match = rawPath.match(pathRegex);
      if (match) {
        const args = match.slice(1, params.length + 1);
        params.reduce((paramsObj, param, idx) => {
          paramsObj[param.replace(symbols.COLON, '')] = args[idx];
          return paramsObj;
        }, pathParams);
        return true;
      }
    }
    return false;
  });
  return { path: foundPath || rawPath, pathParams };
};

const discriminateParamsFromPath = (fullPath, paths) => {
  const [rawPath, querystring] = fullPath.split(symbols.QUERY);
  const { path, pathParams } = extractPathParams(rawPath, paths);
  return { path, pathParams, queryParams: qs.parse(querystring) };
};

exports.extractDataFromresponse = (request, { description, paths }) => {
  const reqHeaders = request.req._headers;
  delete reqHeaders.host;
  delete reqHeaders['accept-encoding'];
  delete reqHeaders['user-agent'];

  const resHeaders = request.headers;
  delete resHeaders['x-powered-by'];
  // TODO: check if format is needed
  const resType = resHeaders[specPaths.CONTENT_TYPE].split(symbols.SEMICOLON)[0];

  const { path, pathParams, queryParams } = discriminateParamsFromPath(request.req.path, paths);

  return addPrototype({
    method: request.req.method.toLowerCase(),
    description,
    path,
    pathParams,
    queryParams,
    reqHeaders,
    reqBody: request.request.toJSON().data,
    statusCode: request.status,
    resHeaders,
    resType,
    resBody: request.body
  });
};

exports.extractPathsFromServer = server =>
  server._router.stack.reduce((paths, endpoint) => {
    if (endpoint.route) paths.push(endpoint.route.path);
    return paths;
  }, []);
