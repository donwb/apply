var ApplicationProvider = require('./ApplicationProvider').ApplicationProvider;

var ApplicationProvider = new ApplicationProvider();

ApplicationProvider.getApplications(function (error, apps) { 
	console.log('in test method');
	console.log(apps);
});

console.log('done');
