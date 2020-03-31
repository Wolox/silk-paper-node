const { dataTypes } = require('../constants');

const getObjectType = value => (Array.isArray(value) ? dataTypes.ARRAY : dataTypes.OBJECT);

const getOpenAPIType = value => {
  const jsType = typeof value;
  // TODO: check formats on each type
  return (
    {
      string: { type: dataTypes.STRING },
      boolean: { type: dataTypes.BOOLEAN },
      number: { type: dataTypes.NUMBER },
      object: { type: getObjectType(value) }
    }[jsType] || { type: dataTypes.STRING }
  );
};

exports.generateOpenApiSchema = struct => {
  const openApiType = getOpenAPIType(struct);
  const { type } = openApiType;

  if (struct && type === dataTypes.OBJECT) {
    const keys = Object.keys(struct);
    return {
      type,
      properties: keys.reduce((schema, key) => {
        schema[key] = exports.generateOpenApiSchema(struct[key]);
        return schema;
      }, {})
    };
  } else if (type === dataTypes.ARRAY) {
    return {
      type,
      // TODO: check array types
      items: exports.generateOpenApiSchema(struct[0])
    };
  }

  return Object.assign(openApiType, {
    example: struct
  });
};
