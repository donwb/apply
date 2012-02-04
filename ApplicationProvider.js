var db = require('./config/db');
var mongoose = require('mongoose');
var Schema = mongoose.Schema, ObjectID = Schema.ObjectId;

var Application = new Schema({
	name		: String,
	email		: String, 
	about		: String,
	urls		: [String]
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

exports.ApplicationProvider = ApplicationProvider;