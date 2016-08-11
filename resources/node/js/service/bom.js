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

exports.getBom = function(erpName, region, plantCode, bomNumber, envConfiguration){
	loggy.info('BOM Object Fetching Begins');
	loggy.debug('BOM Object Fetching for bom: '+bomNumber);
	

	db.execute('SELECT job, item FROM jobmatl where job = ?',[bomNumber],
			  function(err,result,  rows) {
					if(err == undefined){
						rows.forEach(function (row) {
						  console.log('Row: %j', row);
						  loggy.debug('BOM Object Fetching is Successfull for bom: '+bomNumber);
						  loggy.info('BOM Object Fetching Ends');
						});
					}else{
						loggy.debug('BOM Object Fetching Error for bom: '+bomNumber);
						loggy.info('BOM Object Fetching Ends');
					}
				}
	);

	db.close();
	loggy.info('BOM Object Fetching Ends');
	loggy.debug('BOM Object Fetching Ends for bom: '+bomNumber);
}

exports.postBom = function(bomObject, envConfiguration){

	loggy.debug('BOM Object Request Begins');

	var errorObject= {};
	var results = {error:[],success:[]};
	var timeoutLimit = envConfiguration.lawsonServiceTimeOut;
	var bomNumber = bomObject.job;

	var options = {
		  host: '10.109.218.234',
		  path: '/bom?bomObj='+encodeURIComponent(bomObject),
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

				loggy.debug('BOM Object Request Response status: ' + res.statusCode);
              	loggy.debug('BOM Object Response Message: ' + response);

				if(res.statusCode == 200){
							loggy.info('BOM Object Http Request is Successfull for bom: ' + bomNumber);
							loggy.debug('BOM Object Http Request Ends for bom: ' + bomNumber);
							
							//acknowledgement temporary code
							loggy.info("Part Object Http Request is Successfull");
							var successMsg = "BOM Ack Success.";
							var options1 = {
									  host: '10.109.218.234', 
									  path: '/bomack?bomackn='+encodeURIComponent(successMsg),
									  port: '8080',
									  method: 'POST',
									  headers: {
											Accept: 'text/html'
										}
									};
							var reqack = http.request(options1, function(resp){
								loggy.info('ack response status: '+resp.statusCode);
							});
							reqack.on('socket', function(socketres){
								socketres.setTimeout(setTimeout);
								socketres.on('timeout', function(){
									loggy.error('Socket Timeout '+setTimeout+' Exceeds');
								})
							});
							reqack.on('error', function(err1){
								loggy.error('Error on bom Object with error code: ' + err1.code);
							});
							reqack.end();
				
							
						return callback();
				}
				else{
					errorObject = mapper.arrangeErrorMessageResponse(res.statusCode);
                	errorMessageRet ={
                		code: errorObject.errorCode,
                		message: errorObject.errorMessage,
                		date: mapper.getCurrentDateTime()
                	}; 

                	loggy.error('BOM Object Http Request Error for bom: ' + bomNumber);
					loggy.debug('BOM Object Http Request Ends for bom: ' + bomNumber);


                	results.error.push(errorMessageRet);
                	return callback();
				}	
			});
		});
		request.on('socket', function(socket){
        	socket.setTimeout(timeoutLimit);
        	socket.on('timeout', function(){
            	
        		loggy.error('callMapicsService request will aborted due to timeout limit: '+ timeoutLimit + ' for bom: ' + bomNumber);
        	
            	request.abort();
        	})
    	});
    	request.on('error', function(err){
        	
          	loggy.error('Error on BOM Object Request for bom: ' + bomNumber + ', with error code: ' + err.code);
        	loggy.error(err);

        	errorObject = mapper.arrangeErrorMessageRequest(err.code);
        	errorMessageRet ={
        		code: errorObject.errorCode,
        		message: errorObject.errorMessage,
        		date: mapper.getCurrentDateTime()
        	};

          	loggy.error('BOM Object Arranged Error Message for bom: ' + bomNumber + ', with error message: ' + JSON.stringify(errorMessageRet));
        	loggy.debug('BOM Object Http Request Ends for bom: ' + bomNumber);

        	results.error.push(errorMessageRet);
			
        	return callback();
    	});
		request.end();
}