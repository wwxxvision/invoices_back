const BaseModel = require('./BaseModel');

class Service extends BaseModel {
  constructor() {
    super();
    this.fields = [];
    this.tableName = 'services';
  }
}

module.exports = new Service;
