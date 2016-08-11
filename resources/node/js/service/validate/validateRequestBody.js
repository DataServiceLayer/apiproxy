var fs = require('fs');
var Validator = require('C:/Program Files/nodejs/node_modules/npm/node_modules/jsonschema').Validator;
var loggy = require('../logger/logger.js')();

var orderingERP = {values:['LAWSON-BE','MAPICS-RFG']};
var shipCompleteFlag = {values:[1,0,"1","0"]};
var priorityShipment = {values:["1","0",1,0]};
var paymentMethod = {values:["PO Number","Credit Card","Debit Card","Credit","Wire Transfer","Contract"]}


exports.validateRequestBody = function(requestBody){
	
	loggy.debug('validateRequestBody starts');
	
	var v = new Validator();
	var createOrderSchema = {
		id: '/CreateOrder',
		type: 'object',
		properties: {
			orderingERP:{
				type: 'string',
				required: true,
				enum: orderingERP.values
			},
			salesOrg:{
				type: 'string',
				maxLength: 50
			},
			customerId:{
				type: 'string',
				required: true,
				minLength: 1,
				maxLength: 50
			},
			confNumber:{
				type: 'string',
				required: true,
				maxLength: 7,
				minLength: 1
			},
			poNumber:{
				type: 'string',
				required: true,
				maxLength: 50
				//minLength:1
			},
			referenceNumber:{
				type: 'string',
				maxLength: 50
			},
			paymentMethod:{
				type: 'string',
				maxLength: 50
			},
			shipCompleteFlag:{
              	required: true,
				enum:shipCompleteFlag.values
			},
			priorityShipment:{
              	required: true,
				enum:priorityShipment.values
			},
			surChargeCode:{
				type: 'string',
				maxLength: 3
			},
			shipDate:{
				type: 'string',
				required: true,
				maxLength: 8,
				minLength: 8
			},
			shippingMethod:{
				type: 'string',
				required: true
			},
			orderNotes:{
				type: 'string',
				maxLength: 500
			},
			contactName:{
				type: 'string',
				maxLength: 50
			},
			contactPhone:{
				type: 'string',
				maxLength: 50
			},
			contactFax:{
				type: 'string',
				maxLength: 50
			},
			contactEmail:{
				type: 'string',
				maxLength: 50	
			},
			shipToID:{
				type: 'integer'			
			},
			shipToName:{
				type: 'string',
				maxLength: 50,
				minLength: 1,
				required: true
			},
			shipToAddr1:{
				type: 'string',
				maxLength: 50,
				minLength: 1,
				required: true
			},
			shipToAddr2:{
				type: 'string',
				maxLength: 50
			},
			shipToAddr3:{
				type: 'string',
				maxLength: 50
			},
			shipToAddr4:{
				type: 'string',
				maxLength: 50
			},
			shipToCity:{
				type: 'string',
				required: true,
				maxLength: 30,
				minLength: 1
			},
			shipToState:{
				type: 'string',
				//required: true,
				maxLength: 2
              //,
				//minLength: 2 
			},
			shipToZip:{
				type: 'string',
				required: true,
				maxLength: 10,
				minLength: 1
			},
			shipToCountry:{
				type: 'string',
				required: true,
				maxLength: 2,
				minLength: 2
			},
			creditCardAuthCode:{
				type:'string'
			},
			orderItems:{
				type: 'array',
				required: true,
				minItems: 1,
				items:{
					type: 'object',
					properties:{
						lineNumber:{
							type: 'integer',
							required: true,
                          	minimum: 1,
                          	maximum: 999
						},
						productId:{
							type: 'string',
							required: true,
							maxLength: 30,
							minLength: 1
						},
						qty:{
							type: 'integer',
							required: true,
                          	minimum: 1,
                          	maximum: 999999
						},
						price:{
							type: 'number',
							required: true,
							maxLength: 9,
                          	//multipleOf: 0.01,
                          	maximum: 1000000000,
                          	exclusiveMaximum: true
						},
						notes:{
							type: 'string'
						}
					}
				}
			}
		}
	}

	loggy.debug('Validation schema for request: ' + JSON.stringify(createOrderSchema));

	var results = v.validate(requestBody, createOrderSchema);

	loggy.debug('validation results: ' + JSON.stringify(results.errors));
	loggy.debug('validateRequestBody ends');
	
	return createErrorMessage(results.errors);
}

createErrorMessage = function(validationResults){
	var errorMessage =  [];
	for(var i = 0; i < validationResults.length; i++) {
    	errorMessage.push(validationResults[i].property+':'+validationResults[i].message);
  	}
  	return errorMessage;
}