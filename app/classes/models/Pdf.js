const fs = require('fs');
const hb = require('handlebars');
const pdf = require('html-pdf');
const path = require('path');
const slash = require('slash');


class Pdf {
  constructor(name, data) {
    this.pathTemplate = process.cwd() + '/app' + '/classes' + '/views' + '/invoice.html';
    this.name = name;
    this.data = data;
    this.options = {
      'base': slash('file:///' + path.resolve('public') + '/'),
    };
  }

  getTemplateHtml() {
    return new Promise((resolve, reject) => {
      fs.readFile(this.pathTemplate, 'utf8', (err, buffer) => {
        if (err) reject(err);

        resolve(buffer);
      });
    });
  }

  create() {
    return new Promise((resolve, reject) => {
      this.getTemplateHtml()
          .then(async (res) => {
            hb.registerHelper('services', function(service, options) {
              let rows = '';
              for (let i = 0; i < service.length; i++) {
                rows += `
              <tr class="text-simple services ft_arial">
                <td>${service[i].description}</td>
                <td>${service[i].count}</td>
                <td>$${service[i].price}</td>
                <td>$${(parseFloat(service[i].price) * parseInt(service[i].count)).toFixed(2)}</td>
              </tr>
              `;
              }

              return rows;
            });

            const template = hb.compile(res, {strict: true});

            this.data.appPath =path.resolve(process.cwd() + '/public');

            const result = template(this.data);
            const html = result;

            pdf.create(html, this.options).toBuffer((err, buffer) => {
              if (err) return global.logger.error(err);
              resolve(buffer);
            });
          })
          .catch((err) => {
            global.logger.error(err);
            reject(err);
          });
    });
  }
}

module.exports = Pdf;
