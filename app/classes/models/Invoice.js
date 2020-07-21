const BaseModel = require('./BaseModel');
const bankAccountDetails = require('../../store/bankAccountDetails');
const invoiceSchema = require('../../schema/invoiceSchema');
const moment = require('moment');

class Invoice extends BaseModel {
  constructor() {
    super();
    this.fields = [];
    this.tableName = 'invoices';
  }

  calculateTotal(services) {
    let total = 0;

    if (services.length) {
      total += services.reduce((sum, current) => {
        return sum + parseFloat(current.price) * parseInt(current.count);
      }, 0);
    }

    return parseFloat(total).toFixed(2);
  }

  async getInvoiceServices(itemID) {
    return await this.database.select(`* FROM services WHERE invoiceID = ${itemID}`);
  }

  async getClients() {
    return await this.database.select(`* FROM clients`);
  }

  joinBankAccount(fields) {
    return {...fields, ...bankAccountDetails};
  }

  changeDateFormat(date) {
    return moment(date).format('YYYY-MM-DD');
  }

  toReadableDate(date) {
    return moment(date).local().format('YYYY-MM-DD');
  }

  async getAll() {
    let allInvoices = await super.getAll();
    let allServices = allInvoices.map((invoice) => this.getInvoiceServices(invoice.id));
    const clients = await this.getClients();

    allServices = await Promise.all(allServices);

    if (allInvoices.length) {
      allInvoices = allInvoices.map((invoice) => {
        invoice.services = [];
        invoice.client = null;
        const currentServices = allServices.filter((service) => service[0].invoiceID === invoice.id);
        const currentClient = clients.filter((client) => {
          if (client.id === invoice.clientID) {
            return client;
          }

          return false;
        });


        if (currentClient) {
          invoice.client = currentClient[0].name;
        }

        invoice.dateCreated = this.toReadableDate(invoice.dateCreated);

        // invoice.clients = clients;
        invoice.dateCreated = this.changeDateFormat(invoice.dateCreated);

        if (currentServices) {
          invoice.services = currentServices[0];
        }

        return invoice;
      });
    }


    return {
      data: allInvoices,
      schema: invoiceSchema,
      clients,
    };
  }
}

module.exports = new Invoice;
