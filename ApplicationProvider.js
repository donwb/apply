var db = require('./config/db');
var mongoose = require('mongoose');
var json = require('jsonify');

var Schema = mongoose.Schema, ObjectID = Schema.ObjectId;

var Application = new Schema({
	name		: String,
	email		: String, 
	about		: String,
	urls		: [String],
	rawdata		: String
});

mongoose.connect('mongodb://' + db.user + ':' + db.pass + '@' + db.host + ':' + db.port + '/' + db.name);
mongoose.model('Application', Application);

var Application = mongoose.model('Application');

ApplicationProvider = function(){};


ApplicationProvider.prototype.getApplications = function (callback){
	Application.find({}, function (error, apps) {
		callback(null, apps);
	});

};

ApplicationProvider.prototype.saveApp = function (rawdata, callback) {
	console.log('raw data ' + rawdata);
	var data = json.parse(rawdata);

	var app = new Application();
	app.rawdata = rawdata;
	app.name = data.fname;

	app.save(function (err) { 
		console.log('saved!');
		callback(err);
	});
};

exports.ApplicationProvider = ApplicationProvider;