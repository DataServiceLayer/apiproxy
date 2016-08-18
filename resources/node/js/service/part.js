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


exports.getParts = function(erpName, region, plantCode, itemNumber, envConfiguration, callback){

	loggy.info('Part Object Fetching Begins');
	loggy.debug('Part Object Fetching for part: '+itemNumber);
	
	var erpNameValid = ((erpName == 'SYMIX') && (erpName != '')) ? true : false;
	var itemNumberValid = ((itemNumber != undefined) && (itemNumber != '')  && (itemNumber.length <= 100)) ? true : false;
	var regionValid = ((region != undefined) && (region != '')) ? true : false;
	var plantCodeValid = ((plantCode != undefined) && (plantCode != '')) ? true : false;

	if(erpNameValid && itemNumberValid && regionValid && plantCodeValid){
	
		db.execute('SELECT item, description FROM item where item = ?',[itemNumber],
				  function(err,result,  rows) {
					  loggy.debug('Error msg: '+err+' result: '+result+' rows: '+ rows);
						if((err == undefined) && (rows != '')){
							rows.forEach(function (row) {
							  console.log('Row: %j', row);
							  loggy.debug('Part Object Fetching is Successfull for part: '+itemNumber);
							  loggy.info('Part Object Fetching is Successfull.');
							  return callback(mapper.fetchPartObjectMapper(row));
							});
						}else{
							loggy.debug('Part Object Fetching Failed for PartNumber:'+itemNumber);
							loggy.info('Part Object Fetching Failed.');
							return callback(mapper.errorPartNoMapper(itemNumber));
						}
					}
		);
	}else if(!erpNameValid){
		errorObject = mapper.getPartErrorMessageResponse(1);
		loggy.info('Invalid ERPName while Part Object Fetching');
		loggy.debug('Invalid ERPName for ERPName: '+erpName);
		return callback(errorObject);
	}else if(!itemNumberValid){
		errorObject = mapper.getPartErrorMessageResponse(2);
		loggy.info('Invalid PartNumber while Part Object Fetching');
		loggy.debug('Invalid PartNumber for PartNumber: '+itemNumber);
		return callback(errorObject);
	}else if(!region){
		errorObject = mapper.getPartErrorMessageResponse(3);
		loggy.info('Invalid Region while Part Object Fetching');
		loggy.debug('Invalid Region for Region: '+region);
		return callback(errorObject);
	}else if(!plantCode){
		errorObject = mapper.getPartErrorMessageResponse(4);
		loggy.info('Invalid PlantCode while Part Object Fetching');
		loggy.debug('Invalid PlantCode for PlantCode: '+plantCode);
		return callback(errorObject);
	}else{
		errorObject = mapper.getPartErrorMessageResponse(5);
		loggy.info('An unexpected error occurred on the server');
		loggy.debug('An unexpected error occurred on the server: '+plantCode);
		return callback(errorObject);
	}

	db.close();
	loggy.info('Parts Object Fetching Ends');
	loggy.debug('Part Object Fetching Ends for part: '+itemNumber);
}

exports.postParts = function(partArray, envConfiguration, callback){

	loggy.info('Parts object request starts.');
	loggy.debug('Parts object request begins for number:'+partArray[0].number);
	

	var errorObject= {};
	var results = {error:[],success:[]};
	//var uri = util.createHeaderURI(envConfiguration, order);
	var timeoutLimit = 2000; //envConfiguration.lawsonServiceTimeOut;
  
	//loggy.debug('Part Request Header URI:' + uri);
	

	var options = {
		  host: '10.109.218.60',
		  path: '/part?partObj='+encodeURIComponent(JSON.stringify(partArray)),
		  port: '8080',
		  method: 'POST',
		  headers: {
				Accept: 'text/html'
			}
	};
var itemNumber = partArray[0].number;
var request = http.request(options, function(res) {
			
			var response='';
			res.setEncoding('utf8');
			res.on('data', function(chunk) {
				response += chunk;
			});
			res.on('end', function(){
				
				loggy.debug('Part object response status: ' + res.statusCode);
              	loggy.debug('Part object response message: ' + response);

				if(res.statusCode == 200){
							loggy.info('Part object http request is successfull for part.');
							loggy.debug('Part object http request is successfull for part: ' + itemNumber);
							acknowledgementCall('true', itemNumber, function(response){
								  
							});
						callback(mapper.postPartObjectMapper(partArray));
				}
				else{ 
                	loggy.info('Part Object Http Request Error for ' + itemNumber);
					loggy.debug('Part Object Http Request Ends for part: ' + itemNumber);
					acknowledgementCall('false', itemNumber, function(response){
								return callback(mapper.errorPartObjectMapper(partArray));
					});	
				}	
			});
		});
		request.on('socket', function(socket){
        	socket.setTimeout(timeoutLimit);
        	socket.on('timeout', function(){
				errorObject = mapper.postPartErrorMessageResponse(1);
            	request.abort();
				loggy.info('Part object request for socket connection timeout limit exceeds.');
        		loggy.debug('Part object request for socket connection timeout exceeds limit:'+ timeoutLimit + ' for part: ' + itemNumber);
				acknowledgementCall('false', itemNumber, function(response){
							return callback(errorObject);
				});
        	})
    	});
    	request.on('error', function(err){
        	errorObject = mapper.postPartErrorMessageResponse(2);
			loggy.info('Part object request failed.');
			loggy.error('Part object request failed with error code: ' + err.code);
			acknowledgementCall('false', itemNumber, function(response){
							return	callback(errorObject);
			});
    	});
		request.end();
		loggy.info("Part object http request ends.");
		loggy.debug("Part object http request ends for itemNumber:"+itemNumber);
}

acknowledgementCall = function(isSuccess, itemNumber, callback){
							
							var timeoutLimit = 2000;
							
							loggy.info("Part acknowledgement http request begins.");
							loggy.debug("Part acknowledgement http request begins for itemNumber:"+itemNumber);
							var options1 = {
									  host: '10.109.218.60',
									  path: '/partack?partackn='+isSuccess,
									  port: '8080',
									  method: 'POST',
									  headers: {
											Accept: 'text/html'
										}
									};
							var reqack = http.request(options1, function(resp){
								loggy.info('Acknowledgement response begins');
								loggy.debug('Acknowledgement response status: '+resp.statusCode);
								if(resp.statusCode == 200){
									loggy.info('Part acknowledgement success.');
									loggy.debug('Part acknowledgement success with status code : '+resp.statusCode);
									return callback(mapper.postPartAcknowledgeMapper(itemNumber));
								}
							});
							reqack.on('socket', function(socketres){
								socketres.setTimeout(timeoutLimit);
								socketres.on('timeout', function(){
									reqack.abort();
									loggy.info('Part acknowledgement socket connection timeout exceeds.');
								})
							});
							reqack.on('error', function(err1){
								errorObject = mapper.postPartErrorMessageResponse(4);
								loggy.info('Part acknowledgement failed.')
								loggy.error('Part acknowledgement failed with error code: ' + err1.code);
								return callback(errorObject);
							});
							reqack.end();
							loggy.info("Part acknowledgement http request ends.");
							loggy.debug("Part acknowledgement http request ends for itemNumber:"+itemNumber);
}