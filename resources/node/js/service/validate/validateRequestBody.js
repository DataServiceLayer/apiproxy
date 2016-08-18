var fs = require('fs');
var Validator = require('C:/Program Files/nodejs/node_modules/npm/node_modules/jsonschema').Validator;
var loggy = require('../logger/logger.js')();

var v = new Validator();

exports.validatePartRequestBody = function(partArray){
	
	loggy.debug('validatePartRequestBody starts');
	
		var partJSONSchema = {
				id: '/part',
				type: 'array',
				items : {
					type : "object",
					properties: {
						object_id:{
							type : 'string',
							required : true
						},
						className: {
							type : 'string',
							required : true
						},
						last_changed_by: {
							type : 'string',
							required : true
						},
						number: {
							type : 'string',
							required : true
						},
						start_effectivity: {
							type : 'string',
							required : false
						},
						end_effectivity: {
							type : 'string',
							required : false
						},
						start_serialnumber_effectivity: {
							type : 'string',
							required : false
						},
						end_serialnumber_effectivity: {
							type : 'string',
							required : false
						},
						start_lotnumber_effectivity: {
							type : 'string',
							required : false
						},
						end_lotnumber_effectivity: {
							type : 'string',
							required : false
						},
						serialnumber_effectivity_cxtpartnumber: {
							type : 'string',
							required : false
						},
						lotnumber_effectivity_cxtpartnumber: {
							type : 'string',
							required : false
						},
						default_unit: {
							type : 'string',
							required : true
						},
						name: {
							type : 'string',
							required : true
						},
						part_type: {
							type : 'string',
							required : true
						},
						source: {
							type : 'string',
							required : true
						},
						state: {
							type : 'string',
							required : true
						},
						is_phantom: {
							type : 'boolean',
							required : true
						},
						version: {
							type : 'string',
							required : true
						},
						iteration: {
							type : 'integer',
							required : true
						},
						previous_version: {
							type : 'string',
							required : true
						},
						is_configurable: {
							type : 'string',
							required : true
						},
						is_collapsible: {
							type : 'boolean',
							required : true
						},
						target_id: {
							type : 'integer',
							required : true
						}
					}
				}
		};
			
		loggy.debug('Validation schema for request: ' + JSON.stringify(partJSONSchema));

		var results = v.validate(partArray, partJSONSchema);

		loggy.debug('validation results: ' + JSON.stringify(results.errors));
		loggy.debug('validateRequestBody ends');
		
		return createErrorMessage(results.errors);
}


exports.validateBOMRequestBody = function(bomArray){
	
	loggy.debug('validateBOMRequestBody starts');
	
		var bomJSONSchema = {
				id: '/bom',
				type: 'array',
				items : {
					type : "object",
					properties: {
						object_id:{
							type : 'string',
							required : true
						},
						className: {
							type : 'string',
							required : true
						},
						last_changed_by: {
							type : 'string',
							required : true
						},
						number: {
							type : 'string',
							required : true
						},
						start_effectivity: {
							type : 'string',
							required : false
						},
						end_effectivity: {
							type : 'string',
							required : false
						},
						start_serialnumber_effectivity: {
							type : 'string',
							required : false
						},
						end_serialnumber_effectivity: {
							type : 'string',
							required : false
						},
						start_lotnumber_effectivity: {
							type : 'string',
							required : false
						},
						end_lotnumber_effectivity: {
							type : 'string',
							required : false
						},
						serialnumber_effectivity_cxtpartnumber: {
							type : 'string',
							required : false
						},
						lotnumber_effectivity_cxtpartnumber: {
							type : 'string',
							required : false
						},
						default_unit: {
							type : 'string',
							required : true
						},
						name: {
							type : 'string',
							required : true
						},
						part_type: {
							type : 'string',
							required : true
						},
						source: {
							type : 'string',
							required : true
						},
						state: {
							type : 'string',
							required : true
						},
						is_phantom: {
							type : 'boolean',
							required : true
						},
						version: {
							type : 'string',
							required : true
						},
						iteration: {
							type : 'integer',
							required : true
						},
						previous_version: {
							type : 'string',
							required : true
						},
						is_configurable: {
							type : 'string',
							required : false
						},
						is_collapsible: {
							type : 'boolean',
							required : true
						},
						target_id: {
							type : 'integer',
							required : true
						}
					}
				}
		};
			
		loggy.debug('Validation schema for request: ' + JSON.stringify(bomJSONSchema));

		var results = v.validate(bomArray, bomJSONSchema);

		loggy.debug('validation results: ' + JSON.stringify(results.errors));
		loggy.debug('validateBOMRequestBody ends');
		
		return createErrorMessage(results.errors);
}
		
		
		
		
createErrorMessage = function(validationResults){
	var errorMessage =  [];
	for(var i = 0; i < validationResults.length; i++) {
    	errorMessage.push(validationResults[i].property+':'+validationResults[i].message);
  	}
	console.log(errorMessage);
  	return errorMessage;
}