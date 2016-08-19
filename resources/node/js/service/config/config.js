
var configJSON = {
			'ERL':{
					'Host':'symp1pkg.cg.na.jci.com',
					'IP':'10.10.45.93',
					'dbID':'symix-erlp',
					'dbPath':'/u01/sym/erl/symix',
					'socketName':'symix-erlp-e2open',
					'socketNumber':52684,
					'Plant':'ERL', 
					'error' : false
				},
			'JUA':{
					'Host':'symp1pkg.cg.na.jci.com',
					'IP':'10.10.45.93',
					'dbID':'symix-juap',
					'dbPath':'/u01/sym/jua/symix',
					'socketName':'symix-juap-e2open',
					'socketNumber':52764,
					'Plant':'JUA', 
					'error' : false
				},
			'RY1':	{
					'Host':'reyp1pkg.cg.na.jci.com',
					'IP':'10.10.45.92',
					'dbID':'symix-divp',
					'dbPath':'/u01/divsx26p/symix',
					'socketName':'symix-divp-e2open',
					'socketNumber':53561,
					'Plant':'RY1', 
					'error' : false
				},
			'2RY1':	{
					'Host':'reyp1pkg.cg.na.jci.com',
					'IP':'10.10.45.92',
					'dbID':'symixrey-divp',
					'dbPath':'/u01/divsx26p/symixrey',
					'socketName':'symixrey-divp-e2open',
					'socketNumber':53941,
					'Plant':'RY1', 
					'error' : false
				},
			'RY2':	{
					'Host':'reyp1pkg.cg.na.jci.com',
					'IP':'10.10.45.92',
					'dbID':'symix-vlvp',
					'dbPath':'/u01/vlvsx26p/symix',
					'socketName':'symix-vlvp-e2open',
					'socketNumber':53781,
					'Plant':'RY2', 
					'error' : false
				},
			'2RY2':	{
					'Host':'reyp1pkg.cg.na.jci.com',
					'IP':'10.10.45.92',
					'dbID':'symixrey-vlvp',
					'dbPath':'/u01/vlvsx26p/symixrey',
					'socketName':'symixrey-vlvp-e2open',
					'socketNumber':54161,
					'Plant':'RY2', 
					'error' : false
				},
			'local': {
					'Host':'c217u083.cg.na.jci.com',
					'IP':'',
					'dbID':'symix',
					'dbPath':'',
					'socketName':'symix',
					'socketNumber':50963,
					'Plant':'local', 
					'error' : false
			}
};


exports.returnConfigObj = function(key){
	if(configJSON[key] == undefined){
		return { code: 423, message: 'Invalid DB service input.', error : true};
	}else{
		return configJSON[key];
	}
};