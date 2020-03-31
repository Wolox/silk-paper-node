exports.fileTypes = {
  JSON: 'json',
  YAML: 'yml',
  YML: 'yml'
};

exports.schemaTypes = {
  RESPONSE: 'response',
  REQUEST: 'request'
};

exports.paramTypes = {
  QUERY: 'query',
  PATH: 'path',
  HEADERS: 'headers',
  // TODO: not implemented logic for cookies
  COOKIES: 'cookies'
};

exports.dataTypes = {
  STRING: 'string',
  BOOLEAN: 'boolean',
  NUMBER: 'number',
  OBJECT: 'object',
  ARRAY: 'array'
};

exports.specPaths = {
  COMP_SCHEMAS: 'components.schemas',
  JSON_CONTENT_TYPE: 'content.application/json',
  CONTENT_TYPE: 'content-type',
  SPECIFICATION: 'specification',
  PATHS: 'paths',
  PARAMETERS: 'parameters',
  DESCRIPTION: 'description',
  SCHEMAS: 'schema.oneOf',
  RESPONSES: 'responses',
  REQUEST_BODY: 'requestBody'
};

exports.symbols = {
  QUERY: '?',
  SLASH: '/',
  COLON: ':',
  SEMICOLON: ';'
};

exports.DEFAULT_DOCS_DIR = 'docs';
exports.DEFAULT_OPEN_API = '3.0.0';
exports.DEFAULT_TEST_SUIT = 'supertest';

exports.EXAMPLE_SERVER_URL = 'http://api.example.com/v1';
exports.EXAMPLE_SERVER_DESCRIPTION =
  'To see examples on how to set servers, please refer to https://swagger.io/docs/specification/api-host-and-base-path';

exports.PACKAGE_JSON = 'package.json';
exports.ENCODING = 'utf8';
exports.SCHEMA_REF = '#/components/schemas/';
