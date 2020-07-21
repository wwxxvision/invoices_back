const express = require('express');
const app = express();
const CONFIG = require('./app/config/config.js');
const installModule = require('./app/install');

installModule(app);
app.use(express.static('public'));
app.listen(CONFIG.port, () => console.log('App running'));


