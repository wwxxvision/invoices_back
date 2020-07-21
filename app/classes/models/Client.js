
const BaseModel = require('./BaseModel');
const clientSchema = require('../../schema/clientSchema');

class Client extends BaseModel {
  constructor() {
    super();
    this.fields = [];
    this.tableName = 'clients';
  }

  async getClientsInvoices(itemID) {
    const clientInvoicesQuery = `* FROM invoices WHERE clientID = ${itemID}`;
    return await this.database.select(clientInvoicesQuery);
  }

  async getAll() {
    const allServices = await super.getAll();

    return {
      data: allServices,
      schema: clientSchema,
    };
  }
}

module.exports = new Client;
