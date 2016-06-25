var express = require('express');
var app = express();

app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res){
	res.type('text/plain');
	res.send('Codebase');
});

app.get('/about', function(req, res){
	res.type('text/plain');
	res.send('Jabalpur Engineering College');
});

//custom 404 page
app.use(function(req, res){
	res.type('text/plain');
	res.status(404);
	res.send('404-Not Found');
});

//custom 500 page
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.type('text/plain');
	res.status(500);
	res.send('500-Server Error');
});

app.listen(app.get('port'), function(){
	console.log('Express started on http://localhost:'+app.get('port'));
});

var handlebars = require('express3-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.get('/', function(req, res){
	res.render('home');
});
app.get('/about', function(req, res){
	res.render('about', {fortune : randomFortune});
});
//404 catch-all handler(middleware)
app.use(function(req, res, next){
	res.status(404);
	res.render('404');
});
//500 error handler(middleware)
app.use(function(err, req, res){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.use(express.static(__dirname + '/public'));
app.use(function(req, res, next){
	res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
	next();
});

//routes start from here


var fortunes = [
"Conquer your fears or they will conquer you.",
"Rivers need springs.",
"Do not fear what you don't know.",
"You will have a pleasant surprise.",
"Whenever possible, keep it simple.",
];

var fortune = require('./lib/fortune.js');

app.get('/about', function(req, res) {
res.render('about', {
fortune: fortune.getFortune(),
pageTestScript: '/qa/tests-about.js'
} );
});

app.get('/events/codexjec', function(req, res){
res.render('events/codexjec');
});
app.get('/events/request-group-rate', function(req, res){
res.render('events/request-group-rate');
});