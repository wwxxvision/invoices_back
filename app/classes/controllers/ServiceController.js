const Response = require('../system/Response');
const Service = require('../models/Service');
const BaseController = require('../controllers/BaseController');

class ServiceController extends BaseController {
  constructor() {
    super(Service);
  }

  create(fields, database, res) {
    const responseOK = (result) => res.json(Response.ok(null, 'Succsess created service'));

    super.create(fields, database, null, res, responseOK);
  }

  update(fields, itemID, database, res) {
    const responseOK = (result) => res.json(Response.ok(null, 'Succsess updated service'));

    super.update(fields, itemID, database, null, res, responseOK);
  }

  delete(itemID, database, res) {
    const responseOK = (result) => res.json(Response.ok(null, 'Succsess deleted service'));

    super.delete(itemID, database, null, res, responseOK);
  }


  selectAll(database, res) {
    const responseOK = (result) => res.json(Response.ok({services: result}, 'Succsess return all services'));

    super.selectAll(database, null, res, responseOK);
  }
}

module.exports = new ServiceController;
