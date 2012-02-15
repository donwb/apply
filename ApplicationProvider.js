var db = require('./config/db');
var mongoose = require('mongoose');
var json = require('jsonify');

var Schema = mongoose.Schema, ObjectID = Schema.ObjectId;

var Application = new Schema({
    type        : String,
    name        : String,
    email       : String,
    about       : String,
    urls        : [String],
    req         : String,
    egg         : String, // set this to any value you want for extra credit
    rawdata     : String
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

ApplicationProvider.prototype.saveApp = function (rawdata, type, callback) {
    console.log('raw data ' + rawdata);
    var data = json.parse(rawdata);

    var app = new Application();
    app.rawdata = rawdata;
    app.name = data.name;
    app.email = data.email;
    app.about = data.about;
    app.req = data.req;
    app.type = type;

    app.save(function (err) {
        console.log('saved!');
        
        callback(err);
    });
};

exports.ApplicationProvider = ApplicationProvider;



