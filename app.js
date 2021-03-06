var express = require('express');
var mongoose = require('mongoose');
var app = module.exports = express.createServer();

// Wire up db providers
var ApplicationProvider = require('./ApplicationProvider').ApplicationProvider;
var ApplicationProvider = new ApplicationProvider();

var PositionProvider = require('./PositionsProvider').PositionProvider;
var PositionProvider = new PositionProvider();

// config shit
var pub = __dirname + '/public';

app.configure(function(){
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.static(pub));
	app.use(app.router);
});

// env config
app.configure('development', function(){
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true}));
});

app.configure('production', function(){
	app.use(express.errorHandler());
});

//
//-------Routes go here ----
app.get('/', function(req, res) {

	PositionProvider.getPositions(function(err, pos) {
		res.render('index.jade',{layout: true,
			locals: {
				title: 'Apply',
				positions: pos
			}
		});
	});
	
});

app.get('/devs', function (req, res) {
	res.render('devs.jade', {layout: true,
		locals: {
			title: 'Developers'
		}
	});
});

app.get('/design', function (req, res) {
	res.render('design.jade', {layout: true,
		locals: {
			title: 'Designers'
		}
	});
});

app.get('/job/:reqnum', function(req, res){
	PositionProvider.getPosition(req.params.reqnum, function(err, position) {
		res.render('job.jade', {layout: true,
			locals: {
				title: 'Job',
				pos: position
			}
		});
	});
});

app.post('/apply', function(req, res) {

	var rawdata = JSON.stringify(req.body);
	var type = req.body.type == 'designer' ? 'designer' : 'dev';

	Save(rawdata, type, function(err, status) {
		res.contentType('json');
		res.send({status : status});
	});
});

app.get('/apply', function(req, res) {
	res.render('applypage.jade', {layout: true,
		locals: {
			title: 'Apply page'
		}
	});
});

app.get('/admin', function(req, res) {
	res.render('admin', {layout: true,
		locals: {
			title: 'DevJobs Admin'
		}
	});
});


app.get('/admin/add', function(req, res) {
	res.render('add.jade', {layout: true,
		locals: {
			title: 'Add a job'
		}
	});
});

app.post('/admin/add', function(req, res) {
	var rawdata = req.body;
	PositionProvider.Add(rawdata, function(err) {
		res.redirect('home');
	});

});

// ------end routes------


function Save(rawdata, type, callback) {
	var status;

	ApplicationProvider.saveApp(rawdata, type, function (err) {
		status = err === null ? 'ok' : 'failed';
		
		callback(err, status);
	});
}


var port = process.env.PORT || 3000;
if(!module.parent){
	app.listen(port);
	console.log("Express server listenting on port %d",app.address().port);
}



