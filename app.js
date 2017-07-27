var express = require('express');

var bodyParser = require('body-parser');
// create express app
var app = express();
var mongoose = require('mongoose');
//mongoose.connect('mongodb://test:ewd16@ds013300.mlab.com:13300/customers_dbd');
mongoose.connect('mongodb://user:pass@ds013300.mlab.com:13300/customers_dbd');

require('./config/express').addMiddleware(app)
require('./routes')(app)

app.listen(process.env.PORT || 4000, function() {
	console.log('Express server listening');
});
