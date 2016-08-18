var dateFormat = require('C:/Program Files/nodejs/node_modules/npm/node_modules/dateformat');
var loggy = require('../logger/logger.js')();

exports.fetchPartObjectMapper = function(data){
	
	loggy.debug('partObjectMapper starts');
	loggy.debug('partObjectMapper received data: ' + JSON.stringify(data));
	
	var	response = {		
			code: 200,
			message: 'Part Fetching Success.',
			itemNumber: data.item		
		}

	loggy.debug('partObjectMapper sent response: ' + JSON.stringify(response));
	loggy.debug('partObjectMapper ends');

	return response;
}

exports.fetchBOMObjectMapper = function(data){
	
	loggy.debug('BOMObjectMapper starts');
	loggy.debug('BOMObjectMapper received data: ' + JSON.stringify(data));
	
	var	response = {		
			code: 200,
			message: 'BOM Fetching Success.',
			itemNumber: data.item		
		}

	loggy.debug('BOMObjectMapper sent response: ' + JSON.stringify(response));
	loggy.debug('BOMObjectMapper ends');

	return response;
}

exports.errorPartNoMapper = function(partNumber){
	
	loggy.debug('errorPartNoMapper starts');
	loggy.debug('errorPartNoMapper received partNumber: ' + partNumber);
	
	var	response = {		
			code: 423,
			message: 'Invalid Part Number.',
			itemNumber: partNumber		
		}

	loggy.debug('errorPartNoMapper sent response: ' + JSON.stringify(response));
	loggy.debug('errorPartNoMapper ends');

	return response;
}

exports.errorBOMNoMapper = function(bomNumber){
	
	loggy.debug('errorBOMNoMapper starts');
	loggy.debug('errorBOMNoMapper received bomNumber: ' + bomNumber);
	
	var	response = {		
			code: 423,
			message: 'Invalid BOM Number.',
			itemNumber: bomNumber		
		}

	loggy.debug('errorBOMNoMapper sent response: ' + JSON.stringify(response));
	loggy.debug('errorBOMNoMapper ends');

	return response;
}

exports.postPartObjectMapper = function(data){
	
	loggy.debug('postPartObjectMapper starts');
	loggy.debug('postPartObjectMapper received data: ' + JSON.stringify(data));
	
	var	response = {		
			code: 200,
			message: 'Part object request success.'		
		}

	loggy.debug('postPartObjectMapper sent response: ' + JSON.stringify(response));
	loggy.debug('postPartObjectMapper ends');

	return response;
}

exports.postBOMObjectMapper = function(data){
	
	loggy.debug('postBOMObjectMapper starts');
	loggy.debug('postBOMObjectMapper received data: ' + JSON.stringify(data));
	
	var	response = {		
			code: 200,
			message: 'BOM JSON python request success.'		
		}

	loggy.debug('postBOMObjectMapper sent response: ' + JSON.stringify(response));
	loggy.debug('postBOMObjectMapper ends');

	return response;
}


exports.postPartAcknowledgeMapper = function(data){
	loggy.debug('postPartAcknowledgeMapper starts');
	loggy.debug('postPartAcknowledgeMapper received data: ' + JSON.stringify(data));
	
	var	response = {		
			code: 200,
			message: 'Part acknowledgement is success.'		
		}

	loggy.debug('postPartAcknowledgeMapper sent response: ' + JSON.stringify(response));
	loggy.debug('postPartAcknowledgeMapper ends');

	return response;
}

exports.postBOMAcknowledgeMapper = function(data){
	loggy.debug('postBOMAcknowledgeMapper starts');
	loggy.debug('postBOMAcknowledgeMapper received data: ' + JSON.stringify(data));
	
	var	response = {		
			code: 200,
			message: 'BOM JSON acknowledgement is success.'		
		}

	loggy.debug('postBOMAcknowledgeMapper sent response: ' + JSON.stringify(response));
	loggy.debug('postBOMAcknowledgeMapper ends');

	return response;
}

exports.errorPartObjectMapper = function(data){
	
	loggy.debug('errorPartObjectMapper starts');
	loggy.debug('errorPartObjectMapper received partNumber: ' + JSON.stringify(data));
	
	var	response = {		
			code: 423,
			message: 'Part object request failed.'		
		}

	loggy.debug('errorPartObjectMapper sent response: ' + JSON.stringify(response));
	loggy.debug('errorPartObjectMapper ends');

	return response;
}

exports.errorBOMObjectMapper = function(data){
	
	loggy.debug('errorBOMObjectMapper starts');
	loggy.debug('errorBOMObjectMapper received partNumber: ' + JSON.stringify(data));
	
	var	response = {		
			code: 423,
			message: 'BOM JSON python request failed.'		
		}

	loggy.debug('errorBOMObjectMapper sent response: ' + JSON.stringify(response));
	loggy.debug('errorBOMObjectMapper ends');

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


exports.getPartErrorMessageResponse = function(statusCode){

	loggy.debug('getPartErrorMessageResponse starts');
	loggy.debug('statusCode: ' + statusCode);
	
	var responseMessage = {};

	switch(statusCode)
	{
		case 404:
     		responseMessage.errorMessage = '';
     		responseMessage.errorCode = 500;
     		break;
		case 1:
			responseMessage.errorMessage = 'Invalid ERPName Error.';
     		responseMessage.errorCode = 423;
			responseMessage.date = getCurrentDateTime();
     		break;
		case 2:
     		responseMessage.errorMessage = 'Invalid PartNumber Error.';
     		responseMessage.errorCode = 423;
			responseMessage.date = getCurrentDateTime();
     		break;
		case 3:
     		responseMessage.errorMessage = 'Invalid Region Error.'//'Unauthorized Request, invalid username or password';
			responseMessage.errorCode = 423;
			responseMessage.date = getCurrentDateTime();
     		break;
		case 4:
     		responseMessage.errorMessage = 'Invalid PlantCode Error.'//'Unauthorized Request, invalid username or password';
			responseMessage.errorCode = 423;
			responseMessage.date = getCurrentDateTime();
     		break;
		default:
      		responseMessage = 'An unexpected error occurred on the server';
	}

	loggy.debug('getPartErrorMessageResponse ends');
	
	return responseMessage;
}

exports.getBOMErrorMessageResponse = function(statusCode){
	
	loggy.debug('getBOMErrorMessageResponse starts');
	loggy.debug('statusCode: ' + statusCode);
	
	var responseMessage = {};

	switch(statusCode)
	{
		case 404:
     		responseMessage.errorMessage = '';
     		responseMessage.errorCode = 500;
     		break;
		case 1:
			responseMessage.errorMessage = 'Invalid ERPName Error.';
     		responseMessage.errorCode = 423;
			responseMessage.date = getCurrentDateTime();
     		break;
		case 2:
     		responseMessage.errorMessage = 'Invalid BOMNumber Error.';
     		responseMessage.errorCode = 423;
			responseMessage.date = getCurrentDateTime();
     		break;
		case 3:
     		responseMessage.errorMessage = 'Invalid Region Error.'//'Unauthorized Request, invalid username or password';
			responseMessage.errorCode = 423;
			responseMessage.date = getCurrentDateTime();
     		break;
		case 4:
     		responseMessage.errorMessage = 'Invalid PlantCode Error.'//'Unauthorized Request, invalid username or password';
			responseMessage.errorCode = 423;
			responseMessage.date = getCurrentDateTime();
     		break;
		default:
      		responseMessage = 'An unexpected error occurred on the server';
	}

	loggy.debug('getBOMErrorMessageResponse ends');
	
	return responseMessage;
}


exports.postPartErrorMessageResponse = function(statusCode){

	loggy.debug('postPartErrorMessageResponse starts');
	loggy.debug('statusCode: ' + statusCode);
	
	var responseMessage = {};

	switch(statusCode)
	{
		case 404:
     		responseMessage.errorMessage = '';
     		responseMessage.errorCode = 500;
     		break;
		case 1:
     		responseMessage.errorMessage = 'Part object request socket connection timeout.'//'Unauthorized Request, invalid username or password';
			responseMessage.errorCode = 423;
			responseMessage.date = getCurrentDateTime();
     		break;
		case 2:
     		responseMessage.errorMessage = 'Part object request failed.'//'Unauthorized Request, invalid username or password';
			responseMessage.errorCode = 423;
			responseMessage.date = getCurrentDateTime();
     		break;
		case 3:
			responseMessage.errorMessage = 'Part acknowledgement socket connection timeout.';
     		responseMessage.errorCode = 423;
			responseMessage.date = getCurrentDateTime();
     		break;
		case 4:
     		responseMessage.errorMessage = 'Part acknowledgement failed.';
     		responseMessage.errorCode = 423;
			responseMessage.date = getCurrentDateTime();
     		break;
		default:
      		responseMessage = 'An unexpected error occurred on the server';
	}

	loggy.debug('postPartErrorMessageResponse ends');
	
	return responseMessage;
}

exports.postBOMErrorMessageResponse = function(statusCode){
	loggy.debug('postBOMErrorMessageResponse starts');
	loggy.debug('statusCode: ' + statusCode);
	
	var responseMessage = {};

	switch(statusCode)
	{
		case 404:
     		responseMessage.errorMessage = '';
     		responseMessage.errorCode = 500;
     		break;
		case 1:
     		responseMessage.errorMessage = 'BOM python request socket connection timeout.'//'Unauthorized Request, invalid username or password';
			responseMessage.errorCode = 423;
			responseMessage.date = getCurrentDateTime();
     		break;
		case 2:
     		responseMessage.errorMessage = 'BOM python request failed.'//'Unauthorized Request, invalid username or password';
			responseMessage.errorCode = 423;
			responseMessage.date = getCurrentDateTime();
     		break;
		case 3:
			responseMessage.errorMessage = 'BOM python acknowledgement socket connection timeout.';
     		responseMessage.errorCode = 423;
			responseMessage.date = getCurrentDateTime();
     		break;
		case 4:
     		responseMessage.errorMessage = 'BOM acknowledgement failed.';
     		responseMessage.errorCode = 423;
			responseMessage.date = getCurrentDateTime();
     		break;
		default:
      		responseMessage = 'An unexpected error occurred on the server';
	}

	loggy.debug('postBOMErrorMessageResponse ends');
	
	return responseMessage;
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