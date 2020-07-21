class BaseModel {
  constructor() {
    this.database = null;
  }

  filterFields(keys, fields) {
    let newObject = {};

    for (const key in fields) {
      const hasInKeys = Boolean(keys.find((keyFounding) => keyFounding.toUpperCase() === key.toUpperCase()));

      if (!hasInKeys) {
        newObject = {...newObject, [key]: fields[key]};
      }
    }

    return newObject;
  }

  setDatabase(database) {
    this.database = database;
  }

  async create(fields) {
    this.fields = fields;
    const keys = Object.keys(this.fields).join();
    const values = Object.values(this.fields)
        .map((value) => `'${value}'`)
        .join();

    const queryString = `${this.tableName}(${keys}) VALUES (${values})`;

    const resultQuering = await this.database.insert(queryString);

    return resultQuering;
  }

  async update(fields, itemID) {
    this.fields = fields;

    const keyValuePair = Object.keys(this.fields)
        .map((fieldKey) => `${fieldKey} = '${this.fields[fieldKey]}'`)
        .join(',');

    const queryString = `${this.tableName} SET ${keyValuePair} WHERE id = ${itemID}`;
    const resultQuering = await this.database.update(queryString);

    return resultQuering;
  }

  async delete(itemID) {
    const queryString = `FROM ${this.tableName} WHERE id = ${itemID}`;
    const resultQuering = await this.database.delete(queryString);

    return resultQuering;
  }

  async getAll() {
    const queryString = `* FROM ${this.tableName}`;
    const resultQuering = await this.database.select(queryString);

    return resultQuering;
  }
}


module.exports = BaseModel;
