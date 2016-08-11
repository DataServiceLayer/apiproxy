var loggy = require('../logger/logger.js')();

exports.changeRequestBodyValues = function(requestBody){
	
	loggy.debug('changeRequestBodyValues starts');
	
	var changedRequestBody = '';
	if(requestBody.orderingERP == 'LAWSON-BE'){
		changedRequestBody = changeForLawson(requestBody);
	}
	else if(requestBody.orderingERP == 'MAPICS-RFG'){
		changedRequestBody = changeForMapics(requestBody); 
	}

	loggy.debug('changed request body: ' + JSON.stringify(changedRequestBody));
	loggy.debug('changeRequestBodyValues ends');
	
	return changedRequestBody;
}

// Request Body changes for lawson;
changeForLawson = function(requestBody){
	
	loggy.debug('changeForLawson starts');

	var changedRequestBody = requestBody;
	try{

		loggy.debug('trying to change shipCompleteFlag value: ' + requestBody.shipCompleteFlag);

		if(requestBody.shipCompleteFlag == '1'){
			changedRequestBody.shipCompleteFlag = 'Y';
		}
		else{
			changedRequestBody.shipCompleteFlag = '';
		}
	}catch(ex){
		changedRequestBody.shipCompleteFlag = 'Y';
	}

	loggy.debug('changed shipCompleteFlag value: ' + requestBody.shipCompleteFlag);

	try{

		loggy.debug('trying to change priorityShipment value: ' + requestBody.priorityShipment);

		if(requestBody.priorityShipment == '1'){
			changedRequestBody.priorityShipment = 'P';
		}
		else{
			changedRequestBody.priorityShipment = '';	
		}

	}catch(ex){
		changedRequestBody.priorityShipment = '';
	}

	loggy.debug('changed priorityShipment value: ' + requestBody.priorityShipment);

	//contactEmail
	try{

		loggy.debug('trying to change contactEmail value: ' + requestBody.contactEmail);

		if(requestBody.contactEmail == ''){
			changedRequestBody.contactEmail = 'NA';
		}
	}catch(ex){
		changedRequestBody.contactEmail = 'NA';
	}

	loggy.debug('changed contactEmail value: ' + requestBody.contactEmail);

	//contactPhone
	try{

		loggy.debug('trying to change contactPhone value: ' + requestBody.contactPhone);

		if(requestBody.contactPhone == ''){
			changedRequestBody.contactPhone = 'NA';
		}
	}catch(ex){
		changedRequestBody.contactPhone = 'NA';
	}

	loggy.debug('changed contactPhone value: ' + requestBody.contactPhone);

	try{

		loggy.debug('trying to change contactName value: ' + requestBody.contactName);

		if(requestBody.contactName == ''){
			changedRequestBody.contactName = 'NA';
		}

	}catch(ex){
		changedRequestBody.contactName = 'NA';
	}

	loggy.debug('changed contactName value: ' + requestBody.contactName);

	return changedRequestBody;
}

changeForMapics = function(requestBody){

	loggy.debug('changeForMapics starts');
	
	var changedRequestBody = requestBody;

	loggy.debug('changeForMapics ends');
	
	return changedRequestBody;
}