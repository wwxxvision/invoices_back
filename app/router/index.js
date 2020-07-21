// Controllers
const AuthController = require('../classes/controllers/AuthController');
const InvoiceController = require('../classes/controllers/InvoiceController');
const ClientController = require('../classes/controllers/ClientController');
const ServiceController = require('../classes/controllers/ServiceController');

// MiddleWares
const verifyMiddleWare = require('../middlewares/verifyMiddleWare');
const checkTypesMiddleWare = require('../middlewares/checkTypesMiddleWare');

// Shema
const authSchema = require('../schema/authSchema');
const invoiceSchema = require('../schema/invoiceSchema');
const clientSchema = require('../schema/clientSchema');
const serviceSchema = require('../schema/serviceSchema');

module.exports = ((app, database) => {
  app.get('/', verifyMiddleWare);

  app.get('/clients',
      verifyMiddleWare,
      (req, res) => ClientController.selectAll(database, res));

  app.get('/verify', verifyMiddleWare);

  app.get('/invoices',
      verifyMiddleWare,
      (req, res) => InvoiceController.selectAll(database, res));

  app.get('/invoice/pdf/:id',
      verifyMiddleWare,
      (req, res) => InvoiceController.getPdf(database, req.params.id, res));

  app.get('/services',
      verifyMiddleWare,
      (req, res) => ServiceController.selectAll(database, res));

  app.post('/auth',
      (req, res, next) => checkTypesMiddleWare(req, res, next,
          req.body, authSchema),
      (req, res) => AuthController.makeAuthentication(req, res,
          database))
      .get('/auth', (req, res, next) => AuthController.sendSchema(req, res));

  app.post('/invoice/create',
      verifyMiddleWare,
      (req, res, next) => checkTypesMiddleWare(req, res, next,
          req.body, invoiceSchema),
      (req, res) => InvoiceController.create(req.body, database, res, req.body.pdf));

  app.post('/client/create',
      verifyMiddleWare,
      (req, res, next) => checkTypesMiddleWare(req, res, next,
          req.body, clientSchema),
      (req, res) => ClientController.create(req.body, database, res));

  app.post('/service/create',
      verifyMiddleWare,
      (req, res, next) => checkTypesMiddleWare(req, res, next,
          req.body, serviceSchema),
      (req, res) => ServiceController.create(req.body, database, res));

  app.put('/service/update/:id',
      verifyMiddleWare,
      (req, res, next) => checkTypesMiddleWare(req, res, next,
          req.body, serviceSchema),
      (req, res) => erviceController.update(req.body, req.params.id, database, res));

  app.put('/invoice/update/:id',
      verifyMiddleWare,
      (req, res, next) => checkTypesMiddleWare(req, res, next,
          req.body, invoiceSchema),
      (req, res) => InvoiceController.update(req.body, req.params.id, database, res, req.body.pdf));

  app.put('/client/update/:id',
      verifyMiddleWare,
      (req, res) => ClientController.update(req.body, req.params.id, database, res));

  app.delete('/client/delete/:id',
      verifyMiddleWare,
      (req, res) => ClientController.delete(req.params.id, database, res));

  app.delete('/invoice/delete/:id',
      verifyMiddleWare,
      (req, res) => InvoiceController.delete(req.params.id, database, res));

  app.delete('/service/delete/:id',
      verifyMiddleWare,
      (req, res, next) => checkTypesMiddleWare(req, res, next,
          req.body, serviceSchema),
      (req, res) => ServiceController.delete(req.params.id, database, res));
});
