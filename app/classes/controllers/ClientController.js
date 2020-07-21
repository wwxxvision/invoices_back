const Response = require('../system/Response');
const Client = require('../models/Client');
const InvoiceController = require('../controllers/InvoiceController');
const BaseController = require('../controllers/BaseController');

class ClientController extends BaseController {
  constructor() {
    super(Client);
  }

  create(fields, database, res) {
    const responseOK = (result) => res.json(Response.ok(
        null, 'Succsess created client'),
    );

    super.create(fields, database, null, res, responseOK);
  }

  update(fields, itemID, database, res) {
    const responseOK = (result) => res.json(Response.ok(
        null, 'Succsess updated client'),
    );

    super.update(fields, itemID, database, null, res, responseOK);
  }

  async delete(itemID, database, res) {
    const callback = () => {
      this.model.getClientsInvoices(itemID)
          .then((invoices) => {
            if (invoices && invoices.length) {
              invoices = invoices.map((invoice) =>
                InvoiceController.delete(invoice.id, database));
            }
          });
    };

    const responseOK = (result) => res.json(Response.ok(
        null, 'Succsess deleted client'),
    );
    super.delete(itemID, database, callback, res, responseOK);
  }

  selectAll(database, res) {
    const responseOK = (result) => res.json(Response.ok(
        {clients: result}, 'Succsess return all clients'),
    );

    return super.selectAll(database, null, res, responseOK);
  }
}

module.exports = new ClientController;
