var http = require('http');
var jdbc = require('C:/Program Files/nodejs/node_modules/npm/node_modules/trireme-jdbc');
var loggy = require('./logger/logger.js')();
var mapper = require('./mapper/controlsPLMMapper.js');

	var db = new jdbc.Database({
		  url: 'jdbc:datadirect:openedge://c217u083.cg.na.jci.com:50963;DatabaseName=symix',
		  properties: {
			user: 'E2Open',
			password: 'nepO2E01',
		  },
		  minConnections: 1,
		  maxConnections: 20,
		  idleTimeout: 100
	});

var errorObject= {};

exports.getBom = function(erpName, region, plantCode, bomNumber, envConfiguration, callback){

	loggy.info('BOM fetching begins.');
	loggy.debug('BOM fetching begins for bomNumber: '+bomNumber);
	
	var erpNameValid = ((erpName == 'SYMIX') && (erpName != '')) ? true : false;
	var bomNumberValid = ((bomNumber != undefined) && (bomNumber != '')  && (bomNumber.length <= 100)) ? true : false;
	var regionValid = ((region != undefined) && (region != '')) ? true : false;
	var plantCodeValid = ((plantCode != undefined) && (plantCode != '')) ? true : false;

	if(erpNameValid && bomNumberValid && regionValid && plantCodeValid){
	
		db.execute('SELECT item, job FROM item where job = ?',[bomNumber],
				  function(err,result,  rows) {
					  loggy.debug('Error msg: '+err+' result: '+result+' rows: '+ rows);
						if((err == undefined) && (rows != '')){
							rows.forEach(function (row) {
							  console.log('Row: %j', row);
							  loggy.debug('BOM fetching is successfull for bomNumber: '+(bomNumber ));
							  loggy.info('BOM fetching is successfull.');
							  return callback(mapper.fetchBOMObjectMapper(row));
							});
						}else{
							loggy.debug('BOM fetching failed for bomNumber:'+bomNumber);
							loggy.info('BOM fetching failed.');
							return callback(mapper.errorBOMNoMapper(bomNumber));
						}
					}
		);
	}else if(!erpNameValid){
		errorObject = mapper.getBOMErrorMessageResponse(1);
		loggy.info('Invalid ERPName while fetching bom');
		loggy.debug('Invalid ERPName while fetching bom for ERPName: '+erpName);
		return callback(errorObject);
	}else if(!itemNumberValid){
		errorObject = mapper.getBOMErrorMessageResponse(2);
		loggy.info('Invalid BOMNumber while fetching bom');
		loggy.debug('Invalid BOMNumber while fetching bom for BOMNumber: '+bomNumber);
		return callback(errorObject);
	}else if(!region){
		errorObject = mapper.getBOMErrorMessageResponse(3);
		loggy.info('Invalid Region while fetching bom');
		loggy.debug('Invalid Region while fetching bom for Region: '+region);
		return callback(errorObject);
	}else if(!plantCode){
		errorObject = mapper.getBOMErrorMessageResponse(4);
		loggy.info('Invalid PlantCode while fetching bom');
		loggy.debug('Invalid PlantCode while fetching bom for PlantCode: '+plantCode);
		return callback(errorObject);
	}else{
		errorObject = mapper.getBOMErrorMessageResponse(5);
		loggy.info('An unexpected error occurred on the server while fetching BOM');
		loggy.debug('An unexpected error occurred on the server while fetching BOM');
		return callback(errorObject);
	}

	db.close();
	loggy.info('BOM fetching ends');
	loggy.debug('BOM fetching ends for bomNumber: '+bomNumber);
}

exports.postBom = function(bomJSON, envConfiguration, callback){

	loggy.info('BOM receive JSON begins.');
	loggy.debug('BOM receive JSON begins for number:'+bomJSON[0].number);
	

	var errorObject= {};
	var results = {error:[],success:[]};
	var timeoutLimit = 2000; //envConfiguration.lawsonServiceTimeOut;
	var bomNumber = bomJSON[0].number;
	
	loggy.info('BOM JSON python request begins.');
	loggy.debug('BOM JSON pyton request begins for number:'+bomJSON[0].number);

	var options = {
		  host: '10.109.217.184',
		  path: '/bom?bomObj='+encodeURIComponent(bomJSON),
		  port: '8080',
		  method: 'POST',
		  headers: {
				Accept: 'text/html'
			}
	};
var request = http.request(options, function(res) {
			
			var response='';
			res.setEncoding('utf8');
			res.on('data', function(chunk) {
				response += chunk;
			});
			res.on('end', function(){
				
				loggy.debug('BOM JSON python response status: ' + res.statusCode);
              	loggy.debug('BOM JSON python response message: ' + response);

				if(res.statusCode == 200){
							loggy.info('BOM JSON python request is successfull.');
							loggy.debug('BOM JSON python request is successfull for bomNumber: ' + bomNumber);
							acknowledgementCall('true', bomNumber, function(response){
								  
							});
						callback(mapper.postBOMObjectMapper(bomJSON));
				}
				else{ 
                			loggy.info('BOM JSON python request error');
							loggy.debug('BOM JSON python request ends for bomNumber: ' + bomNumber);
							acknowledgementCall('false', bomNumber, function(response){
								return callback(mapper.errorBOMObjectMapper(bomJSON));
							});	
				}	
			});
		});
		request.on('socket', function(socket){
        	socket.setTimeout(timeoutLimit);
        	socket.on('timeout', function(){
				errorObject = mapper.postBOMErrorMessageResponse(1);
            	request.abort();
				loggy.info('BOM JSON python request for socket connection timeout limit exceeds.');
        		loggy.debug('BOM JSON python request for socket connection timeout exceeds limit:'+ timeoutLimit + ' for bomNumber: ' + bomNumber);
				acknowledgementCall('false', bomNumber, function(response){
							return callback(errorObject);
				});
        	})
    	});
    	request.on('error', function(err){
        	errorObject = mapper.postBOMErrorMessageResponse(2);
			loggy.info('BOM JSON python request failed');
			loggy.error('BOM JSON python request failed with error code: ' + err.code);
			acknowledgementCall('false', bomNumber, function(response){
							return	callback(errorObject);
			});
    	});
		request.end();
		loggy.info("BOM JSON python request ends.");
		loggy.debug("BOM JSON python request ends for bomNumber:"+bomNumber);
}

acknowledgementCall = function(isSuccess, bomNumber, callback){
							
							var timeoutLimit = 2000;
							
							loggy.info("BOM JSON acknowledgement request begins.");
							loggy.debug("BOM JSON acknowledgement request begins for bomNumber:"+bomNumber);
							var options1 = {
									  host: '10.109.217.184', 
									  path: '/bomack?bomackn='+encodeURIComponent(isSuccess),
									  port: '8080',
									  method: 'POST',
									  headers: {
											Accept: 'text/html'
										}
									};
							var reqack = http.request(options1, function(resp){
								loggy.info('BOM JSON acknowledgement response begins');
								loggy.debug('BOM JSON acknowledgement response status: '+resp.statusCode);
								if(resp.statusCode == 200){
									loggy.info('BOM JSON acknowledgement success.');
									loggy.debug('BOM JSON acknowledgement success with status code : '+resp.statusCode);
									return callback(mapper.postBOMAcknowledgeMapper(bomNumber));
								}
							});
							reqack.on('socket', function(socketres){
								socketres.setTimeout(timeoutLimit);
								socketres.on('timeout', function(){
									reqack.abort();
									loggy.info('BOM acknowledgement socket connection timeout exceeds.');
									loggy.debug('BOM acknowledgement socket connection timeout exceeds, timeoutlimit:'+timeoutLimit);
								})
							});
							reqack.on('error', function(err1){
								errorObject = mapper.postBOMErrorMessageResponse(4);
								loggy.info('BOM JSON acknowledgement failed.')
								loggy.error('BOM JSON acknowledgement failed with error code: ' + err1.code);
								return callback(errorObject);
							});
							reqack.end();
							loggy.info("BOM JSON acknowledgement request ends.");
							loggy.debug("BOM JSON acknowledgement request ends for bomNumber:"+bomNumber);
}