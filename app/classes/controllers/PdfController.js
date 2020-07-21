const Pdf = require('../models/Pdf');

class PdfController {
  async render(name, data) {
    return new Pdf(name, data).create();
  }
}

module.exports = new PdfController;
