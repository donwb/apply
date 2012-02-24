var db = require('./config/db');
var mongoose = require('mongoose');

var Schema = mongoose.Schema, ObjectID = Schema.ObjectId;

var Position = new Schema({
    title       : String,
    subtitle	: String,
    req         : String,
    url         : String,
    location    : String,
    type        : String,
    writeup     : String
});

mongoose.connect('mongodb://' + db.user + ':' + db.pass + '@' + db.host + ':' + db.port + '/' + db.name);
mongoose.model('Position', Position);

var Position = mongoose.model('Position');

PositionProvider = function(){};

PositionProvider.prototype.getPositions = function(callback) {
    Position.find({}, function(err, positions) {
        callback(err, positions);
    });
};

PositionProvider.prototype.getPosition = function(reqnum, callback) {
	Position.findOne({req: reqnum}, function(err, position) {
		console.log(position);
		callback(err, position);
	});
};

PositionProvider.prototype.Add = function(p, callback) {
    var pos = new Position();

    pos.title = p.title;
    pos.subtitle = p.subtitle;
    pos.req = p.req;
    pos.url = p.url;
    pos.location = p.location;
    pos.type = p.type;
    pos.writeup = p.writeup;
    
    pos.save(function(err){
        callback(err);
    });
};


exports.PositionProvider = PositionProvider;
