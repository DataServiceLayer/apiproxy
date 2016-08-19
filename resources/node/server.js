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
			loggy.info('Get Part Request Begins');
			loggy.debug('Get Part Request - Starts');
			
			var partResponse = part.getParts('SYMIX','ASIA','RY1', '01-10-239', envConfiguration, function(resp){
				loggy.debug('response code: '+resp.errorCode+' response message:'+resp.errorMessage);
				loggy.info('Get Part Request Ends');
				loggy.debug('Get Part Request - Ends');
			});
			res.send("Part Object response");
	}) 


app.listen(port, function(){
	loggy.warn('Server is running now. Address http://localhost:%s',port);
});

app.route('/part')

	.post(function(req,res){
		
		var partArray = [{
					object_id: "OR:wt.part.WTPart:117313:425251666-1466176866678-1329564238-1-0-0-127@tibco.ptc.com",
					className: "com.ptc.windchill.esi.Part",
					last_changed_by: "Administrator",
					number: "0000000032",
					start_effectivity: undefined,
					end_effectivity: undefined,
					start_serialnumber_effectivity: undefined,
					end_serialnumber_effectivity: undefined,
					start_lotnumber_effectivity: undefined,
					end_lotnumber_effectivity: undefined,
					serialnumber_effectivity_cxtpartnumber: undefined,
					lotnumber_effectivity_cxtpartnumber: undefined,
					default_unit: "ea",
					name: "test16",
					part_type: "separable",
					source: "make",
					state: "INWORK",
					is_phantom: false,
					version: "A",
					iteration: 1,
					previous_version: "",
					is_configurable: "standard",
					is_collapsible: false,
					target_id: "RY1"
			}];

		 	
			
			if(validationCheck(partArray,res, 'PART')){
				var envConfiguration = new EnvironmentConf(req);
				loggy.transports.console.level = "debug";//genvConfiguration.logLevel;
				loggy.debug('Post Part - starts');
				
				var partResponse = part.postParts(partArray, envConfiguration, function(resp){
					
				});
				loggy.debug('Post Part - ends');
				res.send("Part request response");
			}
			
	}) 


app.listen(port, function(){
	loggy.warn('Server is running now. Address http://localhost:%s',port);
});

app.route('/bom')

	.get(function(req,res){

		 	var envConfiguration = new EnvironmentConf(req);
      		loggy.transports.console.level = "debug";//genvConfiguration.logLevel;
			loggy.debug('Get BOM - starts');
			var bomResponse = bom.getBom('SYMIX','ASIA','Plant101', '2', envConfiguration, function(resp){
				
			});
			loggy.debug('Get BOM - ends');
			res.send("BOM Object response");
	}) 


app.listen(port, function(){
	loggy.warn('Server is running now. Address http://localhost:%s',port);
});


app.route('/bom')

	.post(function(req,res){
			
			var bomArray = [{
								object_id: "OR:wt.part.WTPart:401060641:104375456-1153348282062-33238777-27-83-253-132@icenterv01.ptc.com",
								className: "com.ptc.windchill.esi.Part",
								last_changed_by: "Administrator",
								number: "0000030158",
								start_effectivity: undefined,
								end_effectivity: undefined,
								start_serialnumber_effectivity: undefined,
								end_serialnumber_effectivity: undefined,
								start_lotnumber_effectivity: undefined,
								end_lotnumber_effectivity: undefined,
								serialnumber_effectivity_cxtpartnumber: "",
								lotnumber_effectivity_cxtpartnumber: "",
								default_unit: "ea",
								name: "Configured Product 2000",
								part_type: "separable",
								source: "make",
								state: "RELEASED",
								is_phantom: false,
								version: "B",
								iteration: 2,
								previous_version: "A",
								is_configurable: undefined,
								is_collapsible: false,
								target_id: "RY2"
			}];
			
			if(validationCheck(bomArray, res, 'BOM')){
				var envConfiguration = new EnvironmentConf(req);
				loggy.transports.console.level = "debug";//genvConfiguration.logLevel;
				loggy.debug('Post BOM - starts');
				var bomResponse = bom.postBom(bomArray, envConfiguration, function(resp){
					
				});
				loggy.debug('Post BOM - ends');
				res.send("BOM Request response");
			}
			
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


validationCheck = function(body,res,type){
	loggy.debug("Validation check for input json begins.");
	var validationResult = (type == 'PART') ? requestBodyValidation.validatePartRequestBody(body) : requestBodyValidation.validateBOMRequestBody(body);
	if(validationResult.length > 0){
		
		loggy.error('validation error: ' + JSON.stringify(validationResult));
		
		var result = {
			code: 423,//validation error 
			message: validationResult,
			date: getCurrentDateTime()
		}
		res.status(423);
		res.send(result);
		loggy.debug("Invalid json: "+ JSON.stringify(result));
		loggy.debug("Validation check for input json ends.");
		return false;
	}
	loggy.debug("Validation check for input json ends.");
	return true;
}

getCurrentDateTime = function(){
	var now = new Date();
	var formattedDate = dateFormat(now,'yyyy-mm-dd H:MM:ss');
	return formattedDate;
}