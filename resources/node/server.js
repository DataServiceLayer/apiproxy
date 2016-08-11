var http = require('http');
var express = require('C:/Program Files/nodejs/node_modules/npm/node_modules/express');
var bodyParser = require('C:/Program Files/nodejs/node_modules/npm/node_modules/body-parser');
var logger = require('C:/Program Files/nodejs/node_modules/npm/node_modules/morgan');
var dateFormat = require('C:/Program Files/nodejs/node_modules/npm/node_modules/dateformat');
var async = require('C:/Program Files/nodejs/node_modules/npm/node_modules/async');
//var apigee = require('C:/Program Files/nodejs/node_modules/npm/node_modules/apigee-access');
//var jdbc = require("C:/Program Files/nodejs/node_modules/npm/node_modules/node-jdbc");            

//use custom libraries for common operations
var loggy = require('./js/service/logger/logger.js')();
var EnvironmentConf = require("./js/service/lib/environmentConf.js");
var requestBodyValidation = require('./js/service/validate/validateRequestBody.js');
var createOrder = require('./js/createRequest.js');
var part = require('./js/service/part.js');
var bom = require('./js/service/bom.js');

var port = 9001;
var app = express();


app.use(logger('combined'));
app.use(bodyParser.json());

//var envConfiguration = new EnvironmentConf(req);
loggy.transports.console.level = "debug";//genvConfiguration.logLevel;

app.use(function(error, req, res, next) {
	if(error instanceof SyntaxError) {

		loggy.warn("An invalid JSON payload is received. System will return a 400 error code");

		var message = { 
			code: 400,
      		message: 'Payload is expected in JSON',
      		date: getCurrentDateTime(),	
		}
		res.status(400).send(message);
	}
});

/* app.route('/purchaseorders')

	.get(function(req,res){

		 	
      
			loggy.debug('Get Purchase Orders PurchaseOrders - starts');
var jinst = require('jdbc/lib/jinst');
 
// isJvmCreated will be true after the first java call.  When this happens, the 
// options and classpath cannot be adjusted. 
if (!jinst.isJvmCreated()) {
  // Add all java options required by your project here.  You get one chance to 
  // setup the options before the first java call. 
  jinst.addOption("-Xrs");
  // Add all jar files required by your project here.  You get one chance to 
  // setup the classpath before the first java call. 
  jinst.setupClasspath(['./drivers/hsqldb.jar',
                        './drivers/derby.jar',
                        './drivers/derbyclient.jar',
                        './drivers/derbytools.jar']);
}
			
			loggy.debug('Get Purchase Orders PurchaseOrders - ends');

				//res.status(data.code);
				res.send("purchase orders");
	})  


app.listen(port, function(){
	loggy.warn('Server is running now. Address http://localhost:%s',port);
});
*/

app.route('/part')

	.get(function(req,res){

		 	var envConfiguration = new EnvironmentConf(req);
      		loggy.transports.console.level = "debug";//genvConfiguration.logLevel;
      
			loggy.debug('Get Part - starts');
			var partResponse = part.getParts('erpName1','U.S','Plant101', '01-10-239', envConfiguration, function(resp){
				
			});
			loggy.debug('Get Part - ends');
			res.send("Part Object response");
	}) 


app.listen(port, function(){
	loggy.warn('Server is running now. Address http://localhost:%s',port);
});

app.route('/part')

	.post(function(req,res){

		 	var envConfiguration = new EnvironmentConf(req);
      		loggy.transports.console.level = "debug";//genvConfiguration.logLevel;
			loggy.debug('Post Part - starts');
			var partObj = {item:'02-10-119', description:'sample item description'};
			var partResponse = part.postParts(partObj, envConfiguration, function(resp){
				
			});
			loggy.debug('Post Part - ends');
			res.send("Part request response");
	}) 


app.listen(port, function(){
	loggy.warn('Server is running now. Address http://localhost:%s',port);
});

app.route('/bom')

	.get(function(req,res){

		 	var envConfiguration = new EnvironmentConf(req);
      		loggy.transports.console.level = "debug";//genvConfiguration.logLevel;
			loggy.debug('Get BOM - starts');
			var bomResponse = bom.getBom('erpName1','U.S','Plant101', '2', envConfiguration, function(resp){
				
			});
			loggy.debug('Get BOM - ends');
			res.send("BOM Object response");
	}) 


app.listen(port, function(){
	loggy.warn('Server is running now. Address http://localhost:%s',port);
});


app.route('/bom')

	.post(function(req,res){

		 	var envConfiguration = new EnvironmentConf(req);
      		loggy.transports.console.level = "debug";//genvConfiguration.logLevel;
			loggy.debug('Post BOM - starts');
			var bomObj = {item:'02-10-119', job:'11'};
			var bomResponse = bom.postBom(bomObj, envConfiguration, function(resp){
				
			});
			loggy.debug('Post BOM - ends');
			res.send("BOM Request response");
			
	}) 


app.listen(port, function(){
	loggy.warn('Server is running now. Address http://localhost:%s',port);
});

/*app.route('*')
	.post(function(req, res) {
      	var envConfiguration = new EnvironmentConf(req);
      loggy.transports.console.level = "debug";//genvConfiguration.logLevel;
      
		//if(validationCheck(req.body,res))
		//{
			loggy.debug('Create Order API starts');

			//createOrder.create(req, res, envConfiguration, function(data) {
				loggy.debug('Create Order API ends');

				//res.status(data.code);
				res.send("Test");
				
			//})
		//}
	})
	.get(function(req,res){

		 	var envConfiguration = new EnvironmentConf(req);
      loggy.transports.console.level = "debug";//genvConfiguration.logLevel;
      
		//if(validationCheck(req.body,res))
		//{
			loggy.debug('Create Order API starts');

			//createOrder.create(req, res, envConfiguration, function(data) {
				loggy.debug('Create Order API ends');

				//res.status(data.code);
				res.send("Test");
				
			//})
		//}
	}) 
	.put(function(req,res){

		loggy.error('A PUT request received. PUT Not Allowed');

    	res.status(405).send({code: 405, message: 'Method PUT is not supported', date: getCurrentDateTime()});
	})


app.listen(port, function(){
	loggy.warn('Server is running now. Address http://localhost:%s',port);
});
*/

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.status('error').send ({
      message: err.message,
      error: err.stack.split("\n")
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.status('error').send({
    message: err.message,
    error: {}
  });
});


validationCheck = function(body,res){
	var validationResult = requestBodyValidation.validateRequestBody(body);
	if(validationResult.length > 0){
		
		loggy.error('validation error: ' + JSON.stringify(validationResult));
		
		var result = {
			code: 422,//validation error 
			message: validationResult,
			date: getCurrentDateTime()
		}
		res.status(422);
		res.send(result);
		return false;
	}
	return true;
}

getCurrentDateTime = function(){
	var now = new Date();
	var formattedDate = dateFormat(now,'yyyy-mm-dd H:MM:ss');
	return formattedDate;
}