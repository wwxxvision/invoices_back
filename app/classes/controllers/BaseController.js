const Response = require('../system/Response');

class BaseController {
  constructor(model) {
    this.model = model;
  }
  async create(fields, database, callback, res, responseCallback) {
    const filteredFields = this.model.filterFields(
        ['services', 'uid', 'pdf'], fields,
    );
    this.model.setDatabase(database);

    const result = await this.model.create(filteredFields);

    if (callback) {
      callback(result);
    }

    if (res && responseCallback) {
      if (!result) {
        res.json(Response.negative('Failed'));

        return;
      }

      responseCallback(result);
    }
  }

  async update(fields, itemID, database, callback, res, responseCallback) {
    const filteredFields = this.model.filterFields(
        ['services', 'uid', 'pdf'], fields,
    );
    this.model.setDatabase(database);

    const result = await this.model.update(filteredFields, itemID, database);

    if (callback) {
      callback(result);
    }

    if (res && responseCallback) {
      if (!result) {
        res.json(Response.negative('Failed'));

        return;
      }

      responseCallback(result);
    }
  }

  async delete(itemID, database, callback, res, responseCallback) {
    this.model.setDatabase(database);
    const result = await this.model.delete(itemID, database);

    if (callback) {
      callback(result);
    }

    if (res && responseCallback) {
      if (!result) {
        res.json(Response.negative('Failed'));

        return;
      }

      responseCallback(result);
    }
  }

  async selectAll(database, callback, res, responseCallback) {
    this.model.setDatabase(database);
    const result = await this.model.getAll();

    if (callback) {
      callback(result);
    }

    if (res && responseCallback) {
      if (!result) {
        res.json(Response.negative('Failed'));

        return;
      }

      responseCallback(result);
    }
  }
}

module.exports = BaseController;
