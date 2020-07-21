const Response = require('../classes/system/Response');

function checkTypesMiddleWare(req, res, next, incomingDataObject, schema) {
  if (incomingDataObject && Object.keys(incomingDataObject).length) {
    const notValideTypes = [];

    Object.keys(incomingDataObject)
        .forEach((incomingKey) => {
          const typeInSchema = schema[incomingKey] && schema[incomingKey].type ?
          schema[incomingKey].type : false;

          const valueIncomingIsValide =
          typeof incomingDataObject[incomingKey] === typeInSchema;

          if (!typeInSchema || !valueIncomingIsValide) {
            notValideTypes.push(`The field ${incomingKey} is not valide`);
          }
        });

    Object.keys(schema).forEach((schemaKey) => {
      if (schema[schemaKey].required && !incomingDataObject[schemaKey]) {
        notValideTypes.push(`The field ${schemaKey} is required`);
      }
    });

    const hasNotValideTypes = Boolean(notValideTypes.length);

    if (hasNotValideTypes) {
      res.json(Response.negative(`${notValideTypes.join()}`, 1));
    } else {
      next();
    }
  } else {
    res.json(Response.negative(`The fields are empties`, 1));
  }
}

module.exports = checkTypesMiddleWare;
