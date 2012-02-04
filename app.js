var express = require('express')

var app = module.exports = express.createServer();

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
	res.render('index.jade',{layout: true,
		locals: {
			title: 'Apply'
		}}
	);
});

// ------end routes------

var port = process.env.PORT || 3000;
if(!module.parent){
	app.listen(port);
	console.log("Express server listenting on port %d",app.address().port);
};