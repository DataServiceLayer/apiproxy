var loggy = require('../logger/logger.js')();


// Request body for part
exports.changePartValues = function(requestBody){
	
	loggy.debug('changePartValues starts');
	var requestJSON = [];
	try{
		requestJSON = (requestBody != undefined) ? requestBody :[{}];
		for(var i=0;i<requestJSON.length;i++){
			requestJSON[i].object_id = (requestJSON[i].object_id == null) ? undefined : requestJSON[i].object_id;
			requestJSON[i].className = (requestJSON[i].className == null) ? undefined : requestJSON[i].className;
			requestJSON[i].last_changed_by = (requestJSON[i].last_changed_by == null) ? undefined : requestJSON[i].last_changed_by;
			requestJSON[i].number = (requestJSON[i].number == null) ? undefined : requestJSON[i].number;
			requestJSON[i].start_effectivity = (requestJSON[i].start_effectivity == null) ? undefined : requestJSON[i].start_effectivity;
			requestJSON[i].end_effectivity = (requestJSON[i].end_effectivity == null) ? undefined : requestJSON[i].end_effectivity;
			requestJSON[i].start_serialnumber_effectivity = (requestJSON[i].start_serialnumber_effectivity == null) ? undefined : requestJSON[i].start_serialnumber_effectivity;
			requestJSON[i].end_serialnumber_effectivity = (requestJSON[i].end_serialnumber_effectivity == null) ? undefined : requestJSON[i].end_serialnumber_effectivity;
			requestJSON[i].start_lotnumber_effectivity = (requestJSON[i].start_lotnumber_effectivity == null) ? undefined : requestJSON[i].start_lotnumber_effectivity;
			requestJSON[i].end_lotnumber_effectivity = (requestJSON[i].end_lotnumber_effectivity == null) ? undefined : requestJSON[i].end_lotnumber_effectivity;
			requestJSON[i].serialnumber_effectivity_cxtpartnumber = (requestJSON[i].serialnumber_effectivity_cxtpartnumber == null) ? undefined : requestJSON[i].serialnumber_effectivity_cxtpartnumber;
			requestJSON[i].lotnumber_effectivity_cxtpartnumber = (requestJSON[i].lotnumber_effectivity_cxtpartnumber == null) ? undefined : requestJSON[i].lotnumber_effectivity_cxtpartnumber;
			requestJSON[i].default_unit = (requestJSON[i].default_unit == null) ? undefined : requestJSON[i].default_unit;
			requestJSON[i].name = (requestJSON[i].name == null) ? undefined : requestJSON[i].name;
			requestJSON[i].part_type = (requestJSON[i].part_type == null) ? undefined : requestJSON[i].part_type;
			requestJSON[i].source = (requestJSON[i].source == null) ? undefined : requestJSON[i].source;
			requestJSON[i].state = (requestJSON[i].state == null) ? undefined : requestJSON[i].state;
			requestJSON[i].is_phantom = (requestJSON[i].is_phantom == null) ? undefined : requestJSON[i].is_phantom;
			requestJSON[i].version = (requestJSON[i].version == null) ? undefined : requestJSON[i].version;
			requestJSON[i].iteration = (requestJSON[i].iteration == null) ? undefined : requestJSON[i].iteration;
			requestJSON[i].previous_version = (requestJSON[i].previous_version == null) ? undefined : requestJSON[i].previous_version;
			requestJSON[i].is_configurable = (requestJSON[i].is_configurable == null) ? undefined : requestJSON[i].is_configurable;
			requestJSON[i].is_collapsible = (requestJSON[i].is_collapsible == null) ? undefined : requestJSON[i].is_collapsible;
			requestJSON[i].target_id = (requestJSON[i].target_id == null) ? undefined : requestJSON[i].target_id;
		}
	}catch(err){
		loggy.info('Error in converting changePartValues');
		loggy.error('changePartValues json requestBody error: '+err);
	}
	
	loggy.debug('changed request body: ' + JSON.stringify(requestJSON));
	loggy.debug('changePartValues ends');
	
	return requestJSON;
}


// Request body for BOM
exports.changeBOMValues = function(requestBody){
	
	loggy.debug('changeBOMValues starts');
	var requestJSON = [];
	try{
		 requestJSON = (requestBody != undefined) ? requestBody :[{}];
		for(var i=0;i<requestJSON.length;i++){
			requestJSON[i].object_id = (requestJSON[i].object_id == null) ? undefined : requestJSON[i].object_id;
			requestJSON[i].className = (requestJSON[i].className == null) ? undefined : requestJSON[i].className;
			requestJSON[i].last_changed_by = (requestJSON[i].last_changed_by == null) ? undefined : requestJSON[i].last_changed_by;
			requestJSON[i].number = (requestJSON[i].number == null) ? undefined : requestJSON[i].number;
			requestJSON[i].start_effectivity = (requestJSON[i].start_effectivity == null) ? undefined : requestJSON[i].start_effectivity;
			requestJSON[i].end_effectivity = (requestJSON[i].end_effectivity == null) ? undefined : requestJSON[i].end_effectivity;
			requestJSON[i].start_serialnumber_effectivity = (requestJSON[i].start_serialnumber_effectivity == null) ? undefined : requestJSON[i].start_serialnumber_effectivity;
			requestJSON[i].end_serialnumber_effectivity = (requestJSON[i].end_serialnumber_effectivity == null) ? undefined : requestJSON[i].end_serialnumber_effectivity;
			requestJSON[i].start_lotnumber_effectivity = (requestJSON[i].start_lotnumber_effectivity == null) ? undefined : requestJSON[i].start_lotnumber_effectivity;
			requestJSON[i].end_lotnumber_effectivity = (requestJSON[i].end_lotnumber_effectivity == null) ? undefined : requestJSON[i].end_lotnumber_effectivity;
			requestJSON[i].serialnumber_effectivity_cxtpartnumber = (requestJSON[i].serialnumber_effectivity_cxtpartnumber == null) ? undefined : requestJSON[i].serialnumber_effectivity_cxtpartnumber;
			requestJSON[i].lotnumber_effectivity_cxtpartnumber = (requestJSON[i].lotnumber_effectivity_cxtpartnumber == null) ? undefined : requestJSON[i].lotnumber_effectivity_cxtpartnumber;
			requestJSON[i].default_unit = (requestJSON[i].default_unit == null) ? undefined : requestJSON[i].default_unit;
			requestJSON[i].name = (requestJSON[i].name == null) ? undefined : requestJSON[i].name;
			requestJSON[i].part_type = (requestJSON[i].part_type == null) ? undefined : requestJSON[i].part_type;
			requestJSON[i].source = (requestJSON[i].source == null) ? undefined : requestJSON[i].source;
			requestJSON[i].state = (requestJSON[i].state == null) ? undefined : requestJSON[i].state;
			requestJSON[i].is_phantom = (requestJSON[i].is_phantom == null) ? undefined : requestJSON[i].is_phantom;
			requestJSON[i].version = (requestJSON[i].version == null) ? undefined : requestJSON[i].version;
			requestJSON[i].iteration = (requestJSON[i].iteration == null) ? undefined : requestJSON[i].iteration;
			requestJSON[i].previous_version = (requestJSON[i].previous_version == null) ? undefined : requestJSON[i].previous_version;
			requestJSON[i].is_configurable = (requestJSON[i].is_configurable == null) ? undefined : requestJSON[i].is_configurable;
			requestJSON[i].is_collapsible = (requestJSON[i].is_collapsible == null) ? undefined : requestJSON[i].is_collapsible;
			requestJSON[i].target_id = (requestJSON[i].target_id == null) ? undefined : requestJSON[i].target_id;
		}
	}catch(err){
		loggy.info('Error in converting changeBOMValues');
		loggy.error('changeBOMValues json requestBody error: '+err);
	}
	
	loggy.debug('changed request body: ' + JSON.stringify(requestJSON));
	loggy.debug('changeBOMValues ends');
	
	return requestJSON;
}