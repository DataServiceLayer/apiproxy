var http = require('http');
var jdbc = require('trireme-jdbc');
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


exports.getParts = function(erpName, region, plantCode, itemNumber, envConfiguration){

	loggy.info('Part Object Fetching Begins');
	loggy.debug('Part Object Fetching for part: '+itemNumber);

	db.execute('SELECT item, description FROM item where item = ?',[itemNumber],
			  function(err,result,  rows) {
					if(err == undefined){
						rows.forEach(function (row) {
						  console.log('Row: %j', row);
						  loggy.debug('Part Object Fetching is Successfull for part: '+itemNumber);
						  loggy.info('Part Object Fetching Ends');
						});
					}else{
						loggy.debug('Part Object Fetching Error for part: '+itemNumber);
						loggy.info('Part Object Fetching Ends');
					}
				}
	);

	db.close();
	loggy.info('Parts Object Fetching Ends');
	loggy.debug('Part Object Fetching Ends for part: '+itemNumber);

}

exports.postParts = function(itemObject, envConfiguration){

	loggy.debug('Parts Object Request Begins');

	var errorObject= {};
	var results = {error:[],success:[]};
	var uri = util.createHeaderURI(envConfiguration, order);
	var timeoutLimit = envConfiguration.lawsonServiceTimeOut;
  
	loggy.debug('Part Request Header URI:' + uri);

	var options = {
		  host: '10.109.218.234',
		  path: '/part?partObj='+encodeURIComponent(objArrStr),
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

				loggy.debug('Part Object Request Response status: ' + res.statusCode);
              	loggy.debug('Part Object Response Message: ' + response);

				if(res.statusCode == 200){
							loggy.info('Part Object Http Request is Successfull for part: ' + itemNumber);
							loggy.debug('Success Message: ' + JSON.stringify(mapper.partsHeaderMapper(result)));
							loggy.debug('Part Object Http Request Ends for part: ' + itemNumber);
							
							//acknowledgement temporary code
							loggy.info("Part Object Http Request:");
							var successMsg = "Part Ack Success.";
							var options1 = {
									  host: '10.109.218.234',
									  path: '/partack?partackn='+encodeURIComponent(successMsg),
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
								loggy.error('Error on part Object with error code: ' + err1.code);
							});
							reqack.end();
				
							
					 		results.success.push(mapper.partsHeaderMapper(result));	
							return callback();
				}
				else{
					errorObject = mapper.arrangeErrorMessageResponse(res.statusCode);
                	errorMessageRet ={
                		code: errorObject.errorCode,
                		message: errorObject.errorMessage,
                		date: mapper.getCurrentDateTime()
                	}; 

                	loggy.error('Part Object Http Request Error for part: ' + itemNumber);
					loggy.error('Error Message: ' + JSON.stringify(mapper.partsHeaderMapper(result)));
					loggy.debug('Part Object Http Request Ends for part: ' + itemNumber);


                	results.error.push(errorMessageRet);
                	return callback();
				}	
			});
		});
		request.on('socket', function(socket){
        	socket.setTimeout(timeoutLimit);
        	socket.on('timeout', function(){
            	
        		loggy.error('callMapicsService request will aborted due to timeout limit: '+ timeoutLimit + ' for part: ' + itemNumber);
        	
            	request.abort();
        	})
    	});
    	request.on('error', function(err){
        	
          	loggy.error('Error on Part Object Request for part: ' + itemNumber + ', with error code: ' + err.code);
        	loggy.error(err);

        	errorObject = mapper.arrangeErrorMessageRequest(err.code);
        	errorMessageRet ={
        		code: errorObject.errorCode,
        		message: errorObject.errorMessage,
        		date: mapper.getCurrentDateTime()
        	};

          	loggy.error('Part Object Arranged Error Message for part: ' + itemNumber + ', with error message: ' + JSON.stringify(errorMessageRet));
        	loggy.debug('Part Object Http Request Ends for part: ' + itemNumber);

        	results.error.push(errorMessageRet);
			
        	return callback();
    	});
		request.end();
}