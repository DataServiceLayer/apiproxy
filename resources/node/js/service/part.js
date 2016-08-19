var http = require('http');
var jdbc = require('C:/Program Files/nodejs/node_modules/npm/node_modules/trireme-jdbc');
var loggy = require('./logger/logger.js')();
var mapper = require('./mapper/controlsPLMMapper.js');
var configjs = require('./config/config.js');
var db = '';

exports.getConnection = function(configObj){

	loggy.info('Symix DB connection starts');

		try{
			if(!configObj.error){
				db = new jdbc.Database({
					  url: 'jdbc:datadirect:openedge://'+configObj.Host+':'+configObj.socketNumber+';DatabaseName='+configObj.dbID,
					  properties: {
						user: 'E2Open',
						password: 'nepO2E01',
					  },
					  minConnections: 1,
					  maxConnections: 20,
					  idleTimeout: 100
				});
			}else{
				loggy.debug('Symix db connection failed for invalid plantCode with response: '+configObj);
			}
		}catch(err){
			loggy.error('Symix db connection failed with error: '+ err);
		}
		
	loggy.info('Symix DB connection ends');
};

this.getConnection(configjs.returnConfigObj('local'));

var errorObject= {};

exports.getParts = function(erpName, region, plantCode, itemNumber, envConfiguration, callback){

	loggy.info('Part fetching begins.');
	loggy.debug('Part fetching begins for partNumber: '+itemNumber);
	
	var erpNameValid = ((erpName == 'SYMIX') && (erpName != '')) ? true : false;
	var itemNumberValid = ((itemNumber != undefined) && (itemNumber != '')  && (itemNumber.length <= 100)) ? true : false;
	var regionValid = ((region != undefined) && (region != '')) ? true : false;
	var plantCodeValid = ((plantCode != undefined) && (plantCode != '')) ? true : false;

	try{
		if(erpNameValid && itemNumberValid && regionValid && plantCodeValid){
			
					db.execute('SELECT item, description FROM item where item = ?',[itemNumber],
							  function(err,result,  rows) {
								  loggy.debug('Error msg: '+err+' result: '+result+' rows: '+ rows);
									if((err == undefined) && (rows != '')){
										rows.forEach(function (row) {
										  console.log('Row: %j', row);
										  loggy.debug('Part fetching is successfull for partNumber: '+itemNumber);
										  loggy.info('Part fetching is successfull.');
										  return callback(mapper.fetchPartObjectMapper(row));
										});
									}else{
										loggy.debug('Part fetching failed for partNumber:'+itemNumber);
										loggy.info('Part fetching failed.');
										return callback(mapper.errorPartNoMapper(itemNumber));
									}
								}
					);
				}else if(!erpNameValid){
					errorObject = mapper.getPartErrorMessageResponse(1);
					loggy.info('Invalid ERPName while fetching part');
					loggy.debug('Invalid ERPName while fetching part for ERPName: '+erpName);
					return callback(errorObject);
				}else if(!itemNumberValid){
					errorObject = mapper.getPartErrorMessageResponse(2);
					loggy.info('Invalid PartNumber while Part fetching');
					loggy.debug('Invalid PartNumber while fetching part for PartNumber: '+itemNumber);
					return callback(errorObject);
				}else if(!regionValid){
					errorObject = mapper.getPartErrorMessageResponse(3);
					loggy.info('Invalid Region while fetching part');
					loggy.debug('Invalid Region while fetching part for Region: '+region);
					return callback(errorObject);
				}else if(!plantCodeValid){
					errorObject = mapper.getPartErrorMessageResponse(4);
					loggy.info('Invalid PlantCode while fetching part');
					loggy.debug('Invalid PlantCode while fetching part for PlantCode: '+plantCode);
					return callback(errorObject);
				}else{
					errorObject = mapper.getPartErrorMessageResponse(5);
					loggy.info('An unexpected error occurred on the server while fetching part');
					loggy.debug('An unexpected error occurred on the server while fetching part');
					return callback(errorObject);
				}
	
	}catch(err){
		errorObject = mapper.getPartErrorMessageResponse(5);
		loggy.info('An unexpected error occurred on the server while fetching part');
		loggy.debug('An unexpected error occurred on the server while fetching part');
		return callback(errorObject);
	}

	db.close();
	loggy.info('Parts fetching ends');
	loggy.debug('Part fetching ends for partNumber: '+itemNumber);
}

exports.postParts = function(partJSON, envConfiguration, callback){

	loggy.info('Part receive JSON begins.');
	loggy.debug('Part receive JSON begins for number:'+partJSON[0].number);
	

	var errorObject= {};
	var results = {error:[],success:[]};
	var timeoutLimit = 2000; //envConfiguration.lawsonServiceTimeOut;
  
	loggy.info('Part JSON python request begins.');
	loggy.debug('Part JSON pyton request begins for number:'+partJSON[0].number);
	

	var options = {
		  host: '10.109.218.60',
		  path: '/part?partObj='+encodeURIComponent(JSON.stringify(partJSON)),
		  port: '8080',
		  method: 'POST',
		  headers: {
				Accept: 'text/html'
			}
	};
var itemNumber = partJSON[0].number;
var request = http.request(options, function(res) {
			
			var response='';
			res.setEncoding('utf8');
			res.on('data', function(chunk) {
				response += chunk;
			});
			res.on('end', function(){
				loggy.debug('Part JSON python response status: ' + res.statusCode);
              			loggy.debug('Part JSON python response message: ' + response);

				if(res.statusCode == 200){
							loggy.info('Part JSON python request is successfull.');
							loggy.debug('Part JSON python request is successfull for partNumber:' + itemNumber);
							acknowledgementCall('true', itemNumber, function(response){
								  
							});
						callback(mapper.postPartObjectMapper(partJSON));
				}
				else{ 
                			loggy.info('Part JSON python request error');
					loggy.debug('Part JSON python request ends for partNumber: ' + itemNumber);
					acknowledgementCall('false', itemNumber, function(response){
								return callback(mapper.errorPartObjectMapper(partJSON));
					});	
				}	
			});
		});
		request.on('socket', function(socket){
        	socket.setTimeout(timeoutLimit);
        	socket.on('timeout', function(){
				errorObject = mapper.postPartErrorMessageResponse(1);
            			request.abort();
				loggy.info('Part JSON python request for socket connection timeout limit exceeds.');
        			loggy.debug('Part JSON python request for socket connection timeout exceeds limit:'+ timeoutLimit + ' for part: ' + itemNumber);
				acknowledgementCall('false', itemNumber, function(response){
							return callback(errorObject);
				});
        	})
    	});
    	request.on('error', function(err){
        	errorObject = mapper.postPartErrorMessageResponse(2);
			loggy.info('Part JSON python request failed.');
			loggy.error('Part JSON python request failed with error code: ' + err.code);
			acknowledgementCall('false', itemNumber, function(response){
							return	callback(errorObject);
			});
    	});
		request.end();
		loggy.info("Part JSON python request ends.");
		loggy.debug("Part JSON python request ends for itemNumber:"+itemNumber);
}

acknowledgementCall = function(isSuccess, itemNumber, callback){
							
							var timeoutLimit = 2000;
							
							loggy.info("Part JSON acknowledgement request begins.");
							loggy.debug("Part JSON acknowledgement request begins for partNumber:"+itemNumber);
							var options1 = {
									  host: '10.109.218.60',
									  path: '/partack?partackn='+encodeURIComponent(isSuccess),
									  port: '8080',
									  method: 'POST',
									  headers: {
											Accept: 'text/html'
										}
									};
							var reqack = http.request(options1, function(resp){
								loggy.info('Part JSON acknowledgement response begins');
								loggy.debug('Part JSON acknowledgement response status: '+resp.statusCode);
								if(resp.statusCode == 200){
									loggy.info('Part JSON acknowledgement success.');
									loggy.debug('Part JSON acknowledgement success with status code : '+resp.statusCode);
									return callback(mapper.postPartAcknowledgeMapper(itemNumber));
								}
							});
							reqack.on('socket', function(socketres){
								socketres.setTimeout(timeoutLimit);
								socketres.on('timeout', function(){
									reqack.abort();
									loggy.info('Part acknowledgement socket connection timeout exceeds.');
									loggy.debug('Part acknowledgement socket connection timeout exceeds, timeoutlimit:'+timeoutLimit);
								})
							});
							reqack.on('error', function(err1){
								errorObject = mapper.postPartErrorMessageResponse(4);
								loggy.info('Part JSON acknowledgement failed.')
								loggy.error('Part JSON acknowledgement failed with error code: ' + err1.code);
								return callback(errorObject);
							});
							reqack.end();
							loggy.info("Part JSON acknowledgement http request ends.");
							loggy.debug("Part JSON acknowledgement http request ends for itemNumber:"+itemNumber);
}
