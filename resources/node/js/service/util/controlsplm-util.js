var base = '/servlet/bizconx.narmock.Engine?';
var loggy = require('../logger/logger.js')();

exports.createHeaderURI =  function(envConfiguration,order) {

	loggy.debug('createHeaderURI starts');

	var uri = base + 'BIZCONX_MAP=YP_ADD_ORDER';
	var splitedNotes = divideOrderNotes(order.orderNotes);
	uri = uri + '&ADDHEADER=1';
	uri = uri + '&LOC=BALT'; 
	//uri = uri + '&WEBUSER' + encodeURIComponent(envConfiguration.webUserLawson);
	uri = uri + '&CUSTOMER=' + encodeURIComponent(order.customerId);
	uri = uri + '&TYPE=' + encodeURIComponent(order.priorityShipment);
	uri = uri + '&COMPLETE=' + encodeURIComponent(order.shipCompleteFlag);
	uri = uri + '&COLLECT=0'; 
	uri = uri + '&REFPO=' + encodeURIComponent(order.referenceNumber);
	uri = uri + '&PONUM=' + encodeURIComponent(order.poNumber);
	uri = uri + '&INST1=' + encodeURIComponent(splitedNotes[0]);
	uri = uri + '&INST2=' + encodeURIComponent(splitedNotes[1]);
	uri = uri + '&INST3=' + encodeURIComponent(splitedNotes[2]);
	uri = uri + '&CONTACTEMAIL=' + encodeURIComponent(order.contactEmail);
	uri = uri + '&CONTACTPHONE=' + encodeURIComponent(order.contactPhone);
	uri = uri + '&CONTACTNAME=' + encodeURIComponent(order.contactName);
	uri = uri + '&SHIPMETHOD=' + encodeURIComponent(order.shippingMethod);
	uri = uri + '&SHIPDATE=' + encodeURIComponent(order.shipDate);
	uri = uri + '&SHIPTONBR=' + encodeURIComponent(order.shipToID);
	uri = uri + '&SHIPTONAME=' + encodeURIComponent(order.shipToName); 
	uri = uri + '&ADDR1=' + encodeURIComponent(order.shipToAddr1);
	uri = uri + '&ADDR2=' + encodeURIComponent(order.shipToAddr2);
	uri = uri + '&ADDR3=' + encodeURIComponent(order.shipToAddr3);
	uri = uri + '&ADDR4=' + encodeURIComponent(order.shipToAddr4);
	uri = uri + '&CITY=' + encodeURIComponent(order.shipToCity);
	uri = uri + '&STATE=' + encodeURIComponent(order.shipToState);
	uri = uri + '&ZIP=' + encodeURIComponent(order.shipToZip); 
	uri = uri + '&COUNTRY=' + encodeURIComponent(order.shipToCountry);
	uri = uri + '&WONBR=' + encodeURIComponent(order.confNumber);

	loggy.debug('createHeaderURI ends');

	return uri;
}

exports.createDetailURI = function(envConfiguration, order, orderItem, orderNumber, itemSequence) {
	
	loggy.debug('createDetailURI starts');

	var uri = base + 'BIZCONX_MAP=YP_ADD_ORDER';
	uri = uri + '&ADDLINE=1';
	uri = uri + '&LOC=BALT';
	//uri = uri + '&WEBUSER' + encodeURIComponent(envConfiguration.webUserLawson);
  	uri = uri + '&CUSTOMER=' + encodeURIComponent(order.customerId);
	uri = uri + '&REFNUM=' + encodeURIComponent(orderNumber);
	uri = uri + '&QTY=' + encodeURIComponent(orderItem.qty);
	uri = uri + '&LINENUM=' + encodeURIComponent(itemSequence);
	uri = uri + '&PLN=' + encodeURIComponent(orderItem.lineNumber); 
	uri = uri + '&ITEM=' + encodeURIComponent(orderItem.productId);
	uri = uri + '&PRICE=' + encodeURIComponent(orderItem.price); 
	uri = uri + '&COMMENTS1=' + encodeURIComponent(orderItem.notes); 
	
	loggy.debug('createDetailURI ends');

	return uri;
}

exports.createUpdatePaymentURI = function(envConfiguration,order, orderNumber) {
	
	loggy.debug('createUpdatePaymentURI starts');

	var uri = base + 'BIZCONX_MAP=YP_CC_UPDATE';
	uri = uri + '&UPDATE=1';
	uri = uri + '&LOC=BALT';
	uri = uri + '&AUTHORIZATION=' + encodeURIComponent(order.creditCardAuthCode);
	uri = uri + '&REFNUMBER=' + encodeURIComponent(orderNumber);
	
	loggy.debug('createUpdatePaymentURI ends');

	return uri;
}

exports.createReleaseOrderURI = function(envConfiguration,order, orderNumber,releaseOrderCCValue) {
	
	loggy.debug('createReleaseOrderURI starts');

	var uri = base + 'BIZCONX_MAP=YP_ADD_ORDER';
	uri = uri + '&RELEASE=1';
	uri = uri + '&LOC=BALT';
	//uri = uri + '&WEBUSER' + encodeURIComponent(envConfiguration.webUserLawson);
	uri = uri + '&CUSTOMER=' + encodeURIComponent(order.customerId);
	uri = uri + '&ORDER=' + encodeURIComponent(orderNumber);
	uri = uri + '&CSR=WEB';
  	if(releaseOrderCCValue != '0'){
  		uri = uri + '&CC=' + encodeURIComponent(releaseOrderCCValue);
  	}
	uri = uri + '&COUNTRY=US';
	
	loggy.debug('createReleaseOrderURI ends');

	return uri;
}

divideOrderNotes = function(orderNotes){
	
	loggy.debug('divideOrderNotes starts');

    var splitedNotes = orderNotes.match(/(.{1,40})/g);
    
    if(splitedNotes == null) {
       	splitedNotes = Array(3).join(".").split(".");
    }
  
    if(splitedNotes.length == 1){
      splitedNotes.push('');
      splitedNotes.push('');			
    }
    else if(splitedNotes.length == 2){
      splitedNotes.push('');
    }

	loggy.debug('splited notes:' + JSON.stringify(splitedNotes));
	loggy.debug('divideOrderNotes ends');

	return splitedNotes;
}