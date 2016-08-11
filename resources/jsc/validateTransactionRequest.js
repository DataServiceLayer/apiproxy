/**
 * Keep your target based validation at this script.
 * Mark the valid as false incase of any errors.  The raise fault policy verify this variable and throw error in case if the valid is false.
 * The message variable used to show the reason for the error.
 */
var valid = true;
var message = '';

/**
 * Below are some examples.  Please remove the below once you start with your validations.
 * 

var packetOperation = context.getVariable('transactionrequest.packetOperation');
if (packetOperation == null || packetOperation.length < 1) {
  valid = false;
  message = message + "" + "Packet Operation is a required field.";
  
} else if (packetOperation != 1 && packetOperation != 17) {
  valid = false;
  message = message + "" + "Invalid Packet Operation. Expect 1 or 17.";
}  else if (packetOperation == 17) {
  message = message + "" + "Expected packet operation for settlement status is 1.";
  valid = false;
}

var mid = context.getVariable('transactionrequest.mid');
if (packetOperation == 1 && (mid == null || mid.length < 1)) {
  valid = false;
  message = message + "" + "mid is a required field.";
}

var cardType = context.getVariable('transactionrequest.cardType');
if (packetOperation == 1 && (cardType == null || cardType.length < 1)) {
  valid = false;
  message = message + "" + "cardType is a required field";
}
 
var pan = context.getVariable('transactionrequest.pan');
if (packetOperation == 1 && (pan == null || pan.length < 1)) {
  valid = false;
  message = message + "" + "pan is a required field.";
}
 
var panExpirationDate = context.getVariable('transactionrequest.panExpirationDate');
if (packetOperation == 1 && (panExpirationDate == null || panExpirationDate.length < 1)) {
  valid = false;
  message = message + "" + "panExpirationDate is a required field.";
}
 
var authorizationAmount = context.getVariable('transactionrequest.authorizationAmount');
if (packetOperation == 1 && (authorizationAmount == null || authorizationAmount.length < 1)) {
  valid = false;
  message = message + "" + "authorizationAmount is a required field.";
}
 
var currencyKey = context.getVariable('transactionrequest.currencyKey');
if (packetOperation == 1 && (currencyKey == null || currencyKey.length < 1)) {
  valid = false;
  message = message + "" + "currencyKey is a required field.";
}
 
var cardDateaSource = context.getVariable('transactionrequest.cardDataSource');
if (packetOperation == 1 && (cardDateaSource == null || cardDateaSource.length < 1)) {
  valid = false;
  message = message + "" + "cardDateaSource is a required field.";
}
 
var customerNumber = context.getVariable('transactionrequest.customerNumber');
if (packetOperation == 1 && (customerNumber == null || customerNumber.length < 1)) {
  valid = false;
  message = message + "" + "customerNumber is a required field.";
}
  
var orderNumber = context.getVariable('transactionrequest.orderNumber');
if ((packetOperation == 1 || packetOperation == 17)&& (orderNumber == null || orderNumber.length < 1)) {
  valid = false;
  message = message + "" + "orderNumber is a required field.";
}
 
var preAuthorized = context.getVariable('transactionrequest.preAuthorized');
if (packetOperation == 1 && (preAuthorized == null || preAuthorized.length < 1)) {
  valid = false;
  message = message + "" + "preAuthorized is a required field.";
}
 
*/

context.setVariable('payloadvalidation.valid', valid);
context.setVariable('payloadvalidation.message', message);
