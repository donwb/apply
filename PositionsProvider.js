var db = require('./config/db');
var mongoose = require('mongoose');

var Schema = mongoose.Schema, ObjectID = Schema.ObjectId;

var Position = new Schema({
    title       : String,
    req         : String,
    url         : String
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

exports.PositionProvider = PositionProvider;
