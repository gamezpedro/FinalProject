let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require( "body-parser" );
let morgan = require('morgan');
let cors = require('cors');
//let jsonParser = bodyParser.json();
let {DATABASE_URL, PORT} = require('./config');
let router = require('./routes');

let app = express();

app.use(express.json()); //Parsea a json
app.use(router);
app.use(cors());

app.use(express.static('public'));
app.use( morgan( 'dev' ) );


//Es para habilitar los CORs y permitir que otras personas accedan al servidor

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
});

app.get('/', function (req,res){
	res.redirect('../public/index.html');
})

let server;

function runServer(port, databaseUrl){
	return new Promise( (resolve, reject ) => {
		mongoose.connect(databaseUrl, response => {
			if ( response ){
				return reject(response);
			}
			else{
				server = app.listen(port, () => {
					console.log( "App is running on port " + port );
					resolve();
				})
				.on( 'error', err => {
					mongoose.disconnect();
					return reject(err);
				})
			}
		});
	});
}

function closeServer(){
	return mongoose.disconnect()
		.then(() => {
			return new Promise((resolve, reject) => {
				console.log('Closing the server');
				server.close( err => {
					if (err){
						return reject(err);
					}
					else{
						resolve();
					}
				});
			});
		});
}
runServer( PORT, DATABASE_URL );

module.exports = { app, runServer, closeServer }