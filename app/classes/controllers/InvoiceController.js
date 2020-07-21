const Response = require('../system/Response');
const Invoice = require('../models/Invoice');
const ServiceController = require('./ServiceController');
const BaseController = require('../controllers/BaseController');
const PdfController = require('./PdfController');

class InvoiceController extends BaseController {
  constructor() {
    super(Invoice);
  }

  async create(fields, database, res, print) {
    const callback = async (result) => {
      if (fields.services && fields.services.length && result) {
        for (let service of fields.services) {
          service = {...service, ['invoiceID']: result.insertId};
          await ServiceController.create(service, database);
        }
      }
    };

    const responseOK = async (result) => {
      if (print) {
        const client = await this.model.getClient(fields.clientID);
        fields = {...fields, total: this.model.calculateTotal(fields.services),
          address: client[0].address, nameClient: client[0].name};
        fields = this.model.joinBankAccount(fields);
        fields.dateCreated = this.model.changeDateFormat(fields.dateCreated);

        const allFields = await this.model.getAll();
        fields.id = allFields.find((field, index) => {
          if (field.id === parseInt(fields.id)) {
            return index;
          }

          return fields.id;
        });

        PdfController.render(fields.name, fields).then((result) => {
          res.json(Response.ok({pdf: result}, 'Succsess created invoice'));
        });

        return;
      }


      res.json(Response.ok(null, 'Succsess created invoice'));
    };

    super.create(fields, database, callback, res, responseOK);
  }

  async update(fields, itemID, database, res, print) {
    const callback = async (result) => {
      if (fields.services && fields.services.length) {
        let allServices = await this.model.getInvoiceServices(itemID);

        if (allServices && allServices.length) {
          allServices = allServices.map((service) =>
            (ServiceController.delete(service.id, database)));

          await Promise.all(allServices);

          for (const service of fields.services) {
            let withoutIDService = {};

            for (const key in service) {
              if (key !== 'id' && key !== 'uid') {
                withoutIDService = {...withoutIDService, [key]: service[key]};
              }
            }

            const invoiceID = service['invoiceID'] ?
              withoutIDService : {...service, ['invoiceID']: itemID};


            await ServiceController.create(invoiceID, database);
          }
        }
      }
    };

    const responseOK = async (result) => {
      if (print) {
        const client = await this.model.getClient(fields.clientID);
        fields = {...fields, total: this.model.calculateTotal(fields.services),
          address: client[0].address, nameClient: client[0].name};
        fields = this.model.joinBankAccount(fields);
        fields.dateCreated = this.model.changeDateFormat(fields.dateCreated);

        const allFields = await this.model.getAll();
        allFields.find((field, index) => {
          if (field.id === fields.id) {
            fields.id = index + 1;

            return;
          }
        });

        PdfController.render(fields.name, fields).then((result) => {
          res.json(Response.ok({pdf: result}, 'Succsess updated invoice'));
        });

        return;
      }

      res.json(Response.ok(null, 'Succsess updated invoice'));
    };

    super.update(fields, itemID, database, callback, res, responseOK);
  }

  delete(itemID, database, res) {
    const callback = async (result) => {
      let allServices = await this.model.getInvoiceServices(itemID);

      if (allServices && allServices.length) {
        allServices = allServices.map((service) =>
          ServiceController.delete(service.id, database));

        await Promise.all(allServices);
      }
    };

    const responseOK = (result) =>
      res.json(Response.ok(null, 'Succsess deleted invoice'));

    super.delete(itemID, database, callback, res, responseOK);
  }


  selectAll(database, res) {
    const responseOK = (result) => res.json(Response.ok({invoices: result}, 'Succsess return all invoices'));

    super.selectAll(database, null, res, responseOK);
  }

  async getPdf(database, id, res) {
    this.model.setDatabase(database);
    const all = await this.model.getAll();

    let fields = all.data.find((item) => item.id === parseInt(id));

    const clients = await this.model.getClients();
    const client = clients.find((item) => item.id === fields.clientID);
    fields.services = await this.model.getInvoiceServices(parseInt(id));
    fields = {...fields, total: this.model.calculateTotal(fields.services),
      address: client.address, nameClient: client.name};
    fields = this.model.joinBankAccount(fields);
    fields.dateCreated = this.model.changeDateFormat(fields.dateCreated);

    all.data.find((field, index) => {
      if (field.id === fields.id) {
        fields.id = index + 1;

        return;
      }
    });

    PdfController.render(fields.name, fields).then((result) => {
      res.json(Response.ok({pdf: result}, 'Succsess getting invoice pdf'));
    });
  }
}

module.exports = new InvoiceController;
