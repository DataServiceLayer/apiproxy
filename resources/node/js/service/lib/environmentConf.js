var apigee = require('C:/Program Files/nodejs/node_modules/npm/node_modules/apigee-access');
var loggy = require('../logger/logger.js')();

function EnvironmentConf(request){
	this.portLawson = apigee.getVariable(request,'portValueLawson');
	this.hostLawson = apigee.getVariable(request,'hostValueLawson');
	this.userNameLawson = apigee.getVariable(request,'userNameValueLawson');
	this.passWordLawson = apigee.getVariable(request,'passWordValueLawson');
	this.webUserLawson = apigee.getVariable(request,'webUserValueLawson');
	this.portMapics = apigee.getVariable(request,'portValueMapics');
	this.hostMapics = apigee.getVariable(request,'hostValueMapics');
	this.pathCreateOrderMapics = apigee.getVariable(request,'pathCreateOrderValueMapics');
	this.envType = 	apigee.getMode();
    this.lawsonServiceTimeOut = apigee.getVariable(request, 'lawsonServiceTimeOut');
	this.mapicsServiceTimeOut = apigee.getVariable(request,'mapicsServiceTimeOut');
  	this.logLevel = apigee.getVariable(request,'logLevel');
}

module.exports = EnvironmentConf;