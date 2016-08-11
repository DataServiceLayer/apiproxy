var dateFormat = require('C:/Program Files/nodejs/node_modules/npm/node_modules/dateformat');
var loggy = require('../logger/logger.js')();

exports.partsHeaderMapper = function(data){
	
	loggy.debug('partsHeaderMapper starts');
	loggy.debug('partsHeaderMapper received data: ' + JSON.stringify(data));

	var response;
	try {
		response = {		
			code: 200,
			message: data.ADDHEADER.SUCCESS[0].msg[0],
			itemNumber: data.ADDHEADER.SUCCESS[0].item		
		}
	} catch(ex) {
		try {
			response = {
				code: 610,
				message: data.ADDHEADER.FAILURE[0].msg[0],
				date: getCurrentDateTime()
			};

			response.message = 'Parts request creation failed.' + ' - ' + data.ADDHEADER.FAILURE[0].msg[0];
		} catch(ex) {
			response = {
				code: 500,
				message: 'An unexpected error occurred on the server',
				date: getCurrentDateTime()
			}
		}
	}

	loggy.debug('partsHeaderMapper sent response: ' + JSON.stringify(response));
	loggy.debug('partsHeaderMapper ends');

	return response;
}

exports.bomHeaderMapper = function(data){
	
	loggy.debug('bomHeaderMapper starts');
	loggy.debug('bomHeaderMapper received data: ' + JSON.stringify(data));

	var response;
	try {
		response = {		
			code: 200,
			message: data.ADDHEADER.SUCCESS[0].msg[0],
			itemNumber: data.ADDHEADER.SUCCESS[0].job		
		}
	} catch(ex) {
		try {
			response = {
				code: 610,
				message: data.ADDHEADER.FAILURE[0].msg[0],
				date: getCurrentDateTime()
			};

			response.message = 'Bom request creation failed.' + ' - ' + data.ADDHEADER.FAILURE[0].msg[0];
		} catch(ex) {
			response = {
				code: 500,
				message: 'An unexpected error occurred on the server',
				date: getCurrentDateTime()
			}
		}
	}

	loggy.debug('bomHeaderMapper sent response: ' + JSON.stringify(response));
	loggy.debug('bomHeaderMapper ends');

	return response;
}

exports.arrangeErrorMessageResponse = function(statusCode){

	loggy.debug('arrangeErrorMessageResponse starts');
	loggy.debug('statusCode: ' + statusCode);

	var responseMessage = {};

	switch(statusCode)
	{
		case 404:
     		responseMessage.errorMessage = '';
     		responseMessage.errorCode = 500;
     		break;
     	case 401:
     		responseMessage.errorMessage = ''//'Unauthorized Request, invalid username or password';
     		break;
     	case 414:
     		responseMessage.errorMessage = '';
     		responseMessage.errorCode = 500;
     		break;
		default:
      		responseMessage = 'An unexpected error occurred on the server';
	}

	loggy.debug('arrangeErrorMessageResponse ends');
	
	return responseMessage;
}


exports.arrangeErrorMessageRequest = function(errorCode){
	
	loggy.debug('arrangeErrorMessageRequest starts');
	
	var responseMessage = {};
	switch(errorCode)
	{
		case 'ECONNRESET':
     		responseMessage.errorCode = 504;
     		responseMessage.errorMessage = 'Backend system did not return in designated time frame';
     		break;
     	case 'ENOTFOUND':
     		responseMessage.errorCode = 502;
     		responseMessage.errorMessage =  'Connection to backend system failed';
     		break;
		default:
			responseMessage.errorCode = 500;
			responseMessage.errorMessage = 'An unexpected error occurred on the server';
	}

	loggy.debug('arrangeErrorMessageRequest ends');
	
	return responseMessage;
}

exports.getCurrentDateTime = function(){
	var now = new Date();
	var formattedDate = dateFormat(now,'yyyy-mm-dd H:MM:ss');
	return formattedDate;
}