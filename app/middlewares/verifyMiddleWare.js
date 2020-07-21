const jwt = require('jsonwebtoken');
const CONFING = require('../config/config');
const Response = require('../classes/system/Response');


function verifyMiddleWare(req, res, next) {
  const {headers} = req;
  const hasAuthHeader = 'authorization' in headers;

  if (hasAuthHeader) {
    const token = headers['authorization'].split(' ')[1];

    if (token) {
      jwt.verify(token, CONFING.jwt.secret, (err, decoded) => {
        if (!err) {
          next();

          return;
        }

        res
            .status(401)
            .json(Response.negative('bad token'));

        return;
      });
    } else {
      res
          .status(401)
          .json(Response.negative('bad token'));

      return;
    }
  } else {
    res
        .status(401)
        .json(Response.negative('Does not have token'));

    return;
  }
}

module.exports = verifyMiddleWare;
