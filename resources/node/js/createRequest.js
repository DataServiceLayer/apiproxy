var async = require('async');
var dateFormat = require('dateformat');
var loggy = require('./service/logger/logger.js')();

var requestBodyMapper = require('./service/validate/mapRequestBody.js');
var parts = require('./service/parts.js');
var bom = require('./service/bom.js');
var mapper = require('./service/mapper/controlsPLMMapper.js');

exports.create = function(req, res, envConfiguration, callback) {

	loggy.debug("ENV configuration: " + JSON.stringify(envConfiguration));

	var acceptType = req.headers.accept;

	loggy.info('acceptType: ' + acceptType);
	loggy.info('requestPayload: ' + JSON.stringify(req.body));

	var order = requestBodyMapper.changeRequestBodyValues(req.body);
		
	if(order.orderingERP == 'parts') {

		loggy.debug('Create Request For Parts');
		
		var itemNumber = '';
		var releaseOrderCCValue = '0';

		async.series([
			function(callback) {
				
				loggy.debug('parts.getParts will be called');

				parts.getParts(erpName, region, plantCode, itemNumber, function(data) { // envConfiguration, order

					if(data.code != 200 ){

						loggy.error('Error On Fetching Part : ' + JSON.stringify(data))
						
						callback(data, null);	
					}
					else{

						itemNumber = data.itemNumber;

						loggy.info('Fetching Part is Successfull. partNumber: ' + itemNumber);

						callback(null, data);	
					}

					loggy.debug('parts.getParts ends');

				});
			}, 
			function(callback) {

				loggy.debug('parts.postParts will be called');

				parts.postParts(envConfiguration, itemObject, function(data) {
					
					if(data.code != 200 ){

						loggy.error('Error On Part Request : ' + JSON.stringify(data))
						
						callback(data, null);	
					}
					else{

						itemNumber = data.itemNumber;

						loggy.info('Part Request is Successfull. partNumber: ' + itemNumber);

						callback(null, data);	
					}

					loggy.debug('parts.postParts ends');

				});
			}
		], 
		function(err, results) {
			var result = {};
			if(err) {
				
				result =  { 
					code: err.code,
					message: err.message ,
					date: getCurrentDateTime(),
					confNumber: '' 
				};

				loggy.error('ERROR on Creating Request for Part: ' + JSON.stringify(result));
					 
			}else{
				result =  {
					code: 200,
			    	message: "Success",
			    	date: getCurrentDateTime(),
			    	confNumber: itemNumber
			    };

			    loggy.info('Create Request For Part is Successfull: ' + JSON.stringify(result));
				 			
			}
			callback(result);
		});
	}else if(order.orderingERP == 'BOM') {

		loggy.debug('Create Request For Parts');
		
		var bomNumber = '';
		var releaseOrderCCValue = '0';

		async.series([
			function(callback) {
				
				loggy.debug('bom.getBom will be called');

				bom.getBom(erpName, region, plantCode, bomNumber, function(data) { 

					if(data.code != 200 ){

						loggy.error('Error On Fetching BOM : ' + JSON.stringify(data))
						
						callback(data, null);	
					}
					else{

						bomNumber = data.bomNumber;

						loggy.info('Fetching BOM is Successfull. bomNumber: ' + bomNumber);

						callback(null, data);	
					}

					loggy.debug('bom.getBom ends');

				});
			}, 
			function(callback) {

				loggy.debug('bom.postBom will be called');

				bom.postBom(envConfiguration, bomObject, function(data) {
					
					if(data.code != 200 ){

						loggy.error('Error On BOM Request : ' + JSON.stringify(data))
						
						callback(data, null);	
					}
					else{

						bomNumber = data.bomNumber;

						loggy.info('BOM Request is Successfull. bomNumber: ' + bomNumber);

						callback(null, data);	
					}

					loggy.debug('bom.postBom ends');

				});
			}
		], 
		function(err, results) {
			var result = {};
			if(err) {
				
				result =  { 
					code: err.code,
					message: err.message ,
					date: getCurrentDateTime(),
					confNumber: '' 
				};

				loggy.error('ERROR on Creating Request for BOM: ' + JSON.stringify(result));
					 
			}else{
				result =  {
					code: 200,
			    	message: "Success",
			    	date: getCurrentDateTime(),
			    	confNumber: bomNumber
			    };

			    loggy.info('Create Request For BOM is Successfull: ' + JSON.stringify(result));
				 			
			}
			callback(result);
		});
	}
}

getCurrentDateTime = function(){
	var now = new Date();
	var formattedDate = dateFormat(now,'yyyy-mm-dd H:MM:ss');
	return formattedDate;
}

