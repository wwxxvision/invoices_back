const Response = require('../system/Response');
const Auth = require('../models/Auth');


class AuthController {
  makeAuthentication(req, res, database) {
    const {login, password} = req.body;

    Auth.authorize(login, password, database)
        .then((jsonWebToken) => {
          if (jsonWebToken) {
            res.json(Response.ok({token: jsonWebToken}, 'Succsess auth'));
          } else {
            res.status(401);
            res.json(Response.negative('Bad auth'));
          }
        });
  }

  sendSchema(req, res) {
    res.json(Response.ok({schema: Auth.getSchema()}));
  }
}

module.exports = new AuthController;
